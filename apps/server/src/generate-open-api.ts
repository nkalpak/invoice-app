import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function generateOpenApi() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('@invoicer').build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey, operationId) => {
      const controllerName = controllerKey
        .toLowerCase()
        .replace('controller', '');

      function firstLetterToUppercase(word: string) {
        return `${word[0].toUpperCase()}${word.slice(1)}`;
      }

      return [controllerName, firstLetterToUppercase(operationId)].join('');
    },
  });
  openApiGenerate(document);

  await app.close();
}
generateOpenApi();

function openApiGenerate(document: OpenAPIObject) {
  fs.writeFileSync('src/api/spec.json', JSON.stringify(document));
  console.log('Generated OpenAPI spec');
}
