import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterHookDto } from './dto/register-hook.dto';
import { computeRequestSigningHmac } from '@invoicer/hmac';
import { ConfigService } from '@nestjs/config';
import { Config } from '../app.module';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService<Config>) {}

  registerHook(registerHookDto: RegisterHookDto, hmac: string) {
    const signingKey = this.configService.get('AUTH_WEBHOOK_SIGNING_KEY');
    if (signingKey === undefined) {
      throw new InternalServerErrorException();
    }

    const isRequestValid =
      hmac ===
      computeRequestSigningHmac(JSON.stringify(registerHookDto), signingKey);
    if (!isRequestValid) {
      throw new BadRequestException();
    }

    console.log('SUCCESSFUL REGISTER', registerHookDto);
  }
}
