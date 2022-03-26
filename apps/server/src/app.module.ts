import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironmentFileName(process.env.NODE_ENV),
      validate: (config) => {
        const schema = z.object({
          DATABASE_HOST: z.string(),
          DATABASE_USER: z.string(),
          DATABASE_NAME: z.string(),
          DATABASE_PORT: z.string().transform(Number),
          DATABASE_PASSWORD: z.string(),
        });

        return schema.parse(config);
      },
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
