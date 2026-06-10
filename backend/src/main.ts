import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import { FallbackFilter } from './fallback.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json({limit: "5mb"}));
  app.use(express.urlencoded({ extended: true, limit: "5mb"}))
  app.useGlobalFilters(app.get(FallbackFilter))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
