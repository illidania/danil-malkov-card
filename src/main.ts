import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AppConfigService } from './config/app-config.service.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // Корректное закрытие соединений с БД по SIGTERM (Docker, Render, Railway).
  app.enableShutdownHooks();

  const { port } = app.get(AppConfigService);
  await app.listen(port, '0.0.0.0');
  new Logger('Bootstrap').log(
    `GraphQL / Apollo Sandbox: http://localhost:${port}/graphql`,
  );
}

await bootstrap();
