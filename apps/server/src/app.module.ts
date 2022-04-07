import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceModule } from './invoice/invoice.module';
import { GlobalModule } from './global/global.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

const configSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PORT: z.string().transform(Number),
  DATABASE_PASSWORD: z.string(),
  COGNITO_USER_POOL_ID: z.string(),
  COGNITO_REGION: z.string(),
  COGNITO_APP_CLIENT_ID: z.string(),
  AUTH_WEBHOOK_SIGNING_KEY: z.string(),
});
export type Config = z.infer<typeof configSchema>;

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvironmentFileName(process.env.NODE_ENV),
      validate: (config) => configSchema.parse(config),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number.parseInt(process.env.DATABASE_PORT!),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
    InvoiceModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

function getEnvironmentFileName(environment: string | undefined) {
  if (environment == undefined) {
    return '.env';
  }

  return ['.', environment, '.env'].join('');
}
