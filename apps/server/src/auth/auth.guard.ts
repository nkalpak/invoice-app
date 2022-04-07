import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Config } from '../app.module';
import { GlobalService } from '../global/global.service';
import * as jwkToBuffer from 'jwk-to-pem';

interface CognitoIdToken {
  header: {
    kid: string;
    alg: string;
  };
  payload: {
    sub: string;
    'custom:sms_marketing': string;
    email_verified: boolean;
    address: {
      formatted: string;
    };
    birthdate: string;
    iss: string;
    phone_number_verified: boolean;
    'cognito:username': string;
    aud: string;
    event_id: string;
    updated_at: number;
    token_use: 'id';
    auth_time: number;
    name: string;
    phone_number: string;
    exp: number;
    iat: number;
    family_name: string;
    email: string;
  };
}

interface CognitoAccessToken {
  header: {
    kid: string;
    alg: string;
  };
  payload: {
    sub: string;
    event_id: string;
    token_use: 'access';
    scope: string;
    auth_time: number;
    iss: string;
    exp: number;
    iat: number;
    jti: string;
    client_id: string;
    username: string;
  };
}

interface VerifiedCognitoAccessToken {
  origin_jti: string;
  sub: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
  client_id: string;
  username: string;
}

interface VerifiedCognitoIdToken {
  sub: string;
  email_verified: boolean;
  iss: string;
  'cognito:username': string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  email: string;
}

export interface Token {
  header: string;
  kid: string;
  iss: string;
  sub: string;
  token_use: string;
  username: string;
}

interface WellKnownJwks {
  keys: {
    kid: string;
    kty: 'RSA';
    n: string;
    e: string;
  }[];
}

let wellKnownJwksCache: WellKnownJwks | undefined = undefined;

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly globalService: GlobalService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const idToken = request.header('id-token');
    const accessToken = request.header('access-token');

    if (idToken == undefined || accessToken == undefined) {
      this.logger.log(
        `Id token or access token not present on request to guarded endpoint: ${JSON.stringify(
          {
            idToken,
            accessToken,
          },
        )}`,
      );
      return false;
    }

    const userPoolId = this.configService.get('COGNITO_USER_POOL_ID');
    const region = this.configService.get('COGNITO_REGION');
    const url = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;

    if (wellKnownJwksCache === undefined) {
      const response = await this.globalService.httpService.get<WellKnownJwks>(
        url,
      );
      wellKnownJwksCache = response.data;
    }

    try {
      const verifiedIdToken = verifyToken(
        idToken,
        wellKnownJwksCache,
      ) as unknown as VerifiedCognitoIdToken;
      const verifiedAccessToken = verifyToken(
        accessToken,
        wellKnownJwksCache,
      ) as unknown as VerifiedCognitoAccessToken;

      const nowMs = Date.now();
      if (
        isTokenExpired(verifiedIdToken, nowMs) ||
        isTokenExpired(verifiedAccessToken, nowMs)
      ) {
        this.logger.error(
          `One of the following tokens is expired: ${JSON.stringify(
            [verifiedIdToken, verifiedAccessToken],
            null,
            2,
          )}`,
        );
        return false;
      }

      const audience = this.configService.get('COGNITO_APP_CLIENT_ID');
      if (
        verifiedAccessToken.client_id !== audience ||
        verifiedIdToken.aud !== audience
      ) {
        this.logger.error(
          `One of the following tokens' audience doesn't match ${audience}: ${JSON.stringify(
            [verifiedAccessToken, verifiedIdToken],
            null,
            2,
          )}`,
        );
        return false;
      }

      const issuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
      if (
        verifiedIdToken.iss !== issuer ||
        verifiedAccessToken.iss !== issuer
      ) {
        this.logger.error(
          `One of the following tokens' issuer doesn't match ${issuer}: ${JSON.stringify(
            [verifiedIdToken, verifiedAccessToken],
            null,
            2,
          )}`,
        );
        return false;
      }

      return true;
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        this.logger.error(`Something failed while validating a token ${error}`);
      } else {
        this.logger.error(`Unexpected error ${error}`);
      }

      return false;
    }
  }
}

function isTokenExpired<T extends { exp: number }>(token: T, nowMs: number) {
  // Token expiry is in UNIX seconds time, while we get the time in ms
  return token.exp < nowMs / 1000;
}

class InvalidTokenError extends Error {
  constructor() {
    super();
    this.message = 'Invalid token';
    this.name = 'InvalidTokenError';
  }
}

function verifyToken(token: string, wellKnownJwks: WellKnownJwks) {
  const decoded = jwt.decode(token, { complete: true }) as
    | null
    | CognitoIdToken
    | CognitoAccessToken;
  if (decoded == undefined) {
    throw new InvalidTokenError();
  }

  if (
    decoded.payload.token_use !== 'access' &&
    decoded.payload.token_use !== 'id'
  ) {
    throw new InvalidTokenError();
  }

  const knownJwk = wellKnownJwks.keys.find(
    (key) => key.kid === decoded.header.kid,
  );
  if (knownJwk == undefined) {
    throw new InvalidTokenError();
  }

  const verified = jwt.verify(token, jwkToBuffer(knownJwk), {
    algorithms: ['RS256'],
  });
  if (verified == undefined) {
    throw new InvalidTokenError();
  }

  if (typeof verified === 'string') {
    const verifiedDecoded = jwt.decode(verified, { complete: true });
    if (verifiedDecoded == undefined) {
      throw new InvalidTokenError();
    }
    return verifiedDecoded;
  }

  return verified;
}
