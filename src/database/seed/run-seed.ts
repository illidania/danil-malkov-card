import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { profileSeed } from './profile.data.js';
import { SeedModule } from './seed.module.js';
import { SeedService } from './seed.service.js';

/** Точка входа `npm run db:seed` — запускается перед стартом приложения. */
const app = await NestFactory.createApplicationContext(SeedModule);
try {
  await app.get(SeedService).seedProfile(profileSeed);
} finally {
  await app.close();
}
