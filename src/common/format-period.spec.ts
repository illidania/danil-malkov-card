import { describe, expect, it } from 'vitest';
import { formatPeriod } from './format-period.js';

describe('formatPeriod', () => {
  it('форматирует закрытый период', () => {
    expect(formatPeriod(new Date('2024-07-01'), new Date('2026-09-01'))).toBe(
      'Июль 2024 – Сентябрь 2026',
    );
  });

  it('помечает текущее место работы', () => {
    expect(formatPeriod(new Date('2023-06-01'), null)).toBe(
      'Июнь 2023 – наст. время',
    );
  });
});
