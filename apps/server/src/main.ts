/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
// TODO: Zaimplementować swagger
// TODO: Zaimplementować DTO dla komunikacji endpointów i wykorzystać class-validator
// TODO: W wersji 2.0 przepisać implementacje na CQRS
// TODO: Wystawić HealthCheck
// TODO: Wersjonowanie api
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()

    .setTitle('Ikea Cirtular Tracker API')
    .setDescription('The Ikea Cirtular Tracker API description')
    .setVersion('1.0')
    .addTag('ikea')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();
