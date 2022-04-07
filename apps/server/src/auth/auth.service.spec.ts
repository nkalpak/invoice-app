/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { build, fake } from '@jackfranklin/test-data-bot';
import { RegisterHookDto } from './dto/register-hook.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { computeRequestSigningHmac } from '../../../../lib/hmac/src';
import * as dayjs from 'dayjs';

type MockConfigService<T = any> = Partial<
  Record<keyof ConfigService<T>, jest.Mock>
>;
function createMockConfigService<T = any>(): MockConfigService<T> {
  return {
    get: jest.fn(),
  };
}

const buildRegisterHookDto = build<RegisterHookDto>({
  fields: {
    email: fake((f) => f.internet.email()),
    timestamp: fake((f) => f.time.recent()),
    username: fake((f) => f.datatype.uuid()),
  },
});

const buildKey = build<{ key: string }>({
  fields: {
    key: fake((f) => f.datatype.string(64)),
  },
});

describe('AuthService', () => {
  let service: AuthService;
  let configService: MockConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: createMockConfigService(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    configService = module.get<MockConfigService>(ConfigService as any);
  });

  describe('registerHook', function () {
    describe('when the signing key is missing from the configuration', function () {
      it('should throw the "InternalServerErrorException"', function () {
        configService.get?.mockReturnValue(undefined);
        expect(() =>
          service.registerHook(buildRegisterHookDto(), '', Date.now()),
        ).toThrow(InternalServerErrorException);
      });
    });

    describe('when different signing keys are used', function () {
      it('should throw the "BadRequestException"', function () {
        const [keyOne, keyTwo] = [buildKey(), buildKey()];
        const payload = buildRegisterHookDto();
        const hmac = computeRequestSigningHmac(
          JSON.stringify(payload),
          keyOne.key,
        );

        configService.get?.mockReturnValue(keyTwo.key);

        expect(() => service.registerHook(payload, hmac, Date.now())).toThrow(
          BadRequestException,
        );
      });
    });

    describe('when the payload is older than five minutes', function () {
      it('should throw the "BadRequestException"', function () {
        const { key } = buildKey();
        const payload = buildRegisterHookDto({
          overrides: {
            timestamp: dayjs()
              .subtract(5 * 60 + 1, 'second')
              .valueOf(),
          },
        });
        const hmac = computeRequestSigningHmac(JSON.stringify(payload), key);

        configService.get?.mockReturnValue(key);

        expect(() =>
          service.registerHook(payload, hmac, dayjs().valueOf()),
        ).toThrow(BadRequestException);
      });
    });
  });
});
