const monthYear = new Intl.DateTimeFormat('ru-RU', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatMonth(date: Date): string {
  // «июль 2024 г.» → «Июль 2024»
  return capitalize(monthYear.format(date).replace(/\s*г\.$/, ''));
}

/** «Июль 2024 – Сентябрь 2026» или «Июнь 2023 – наст. время», если endDate не задан. */
export function formatPeriod(startDate: Date, endDate: Date | null): string {
  const end = endDate ? formatMonth(endDate) : 'наст. время';
  return `${formatMonth(startDate)} – ${end}`;
}
