import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from './env.js';

/** Типизированная обёртка над ConfigService, чтобы не работать со строковыми ключами. */
@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService<Env, true>) {}

  get isProduction(): boolean {
    return this.config.get('NODE_ENV', { infer: true }) === 'production';
  }

  get port(): number {
    return this.config.get('PORT', { infer: true });
  }

  get databaseUrl(): string {
    return this.config.get('DATABASE_URL', { infer: true });
  }

  get logQueries(): boolean {
    return this.config.get('LOG_QUERIES', { infer: true });
  }
}
