import {
  Controller,
  Get,
  Redirect,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /** Открывающий приложение в браузере сразу попадает в Apollo Sandbox. */
  @Get()
  @Redirect('/graphql')
  root(): void {}

  /** Проба для оркестратора: проверяет, что приложение живо и БД отвечает. */
  @Get('health')
  async health(): Promise<{ status: 'ok' }> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      throw new ServiceUnavailableException('Database is unavailable');
    }
    return { status: 'ok' };
  }
}
