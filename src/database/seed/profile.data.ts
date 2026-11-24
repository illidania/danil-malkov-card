import type { LinkType, SkillCategory } from '../../generated/prisma/enums.js';

/**
 * Данные визитки — единственное место, которое нужно править, чтобы обновить
 * содержимое API. Источник: резюме (Fullstack-разработчик React & NestJS).
 */

/** Навыки по категориям. `as const` даёт проверку опечаток в experience/projects. */
export const skillsByCategory = {
  LANGUAGES: [
    'TypeScript',
    'JavaScript (ES6+)',
    'Python 3',
    'SQL',
    'HTML5',
    'CSS3/SCSS',
  ],
  FRONTEND: [
    'React 18/19',
    'Next.js',
    'Redux Toolkit (RTK Query)',
    'TanStack Query',
    'Zustand',
    'TanStack Table',
    'React Hook Form',
    'Zod',
    'Tailwind CSS',
    'shadcn/ui',
    'Ant Design',
    'Material-UI',
    'WebSockets',
    'SSE',
  ],
  BACKEND: [
    'Node.js',
    'NestJS',
    'Express',
    'GraphQL',
    'Django REST Framework',
    'Celery',
    'RabbitMQ',
    'Kafka',
  ],
  DATABASES: ['PostgreSQL', 'Redis', 'Prisma ORM', 'TypeORM'],
  TOOLING: [
    'Feature-Sliced Design',
    'REST API',
    'OpenAPI/Swagger',
    'Docker',
    'GitLab CI/CD',
    'Vite',
    'Webpack',
    'Vitest',
    'Jest',
    'Playwright',
    'Git',
  ],
  PRACTICES: [
    'Spec-Driven Development',
    'AI-Driven Development',
    'Performance Optimization',
  ],
} as const satisfies Record<SkillCategory, readonly string[]>;

export type SkillName = (typeof skillsByCategory)[SkillCategory][number];

interface LinkSeed {
  type: LinkType;
  label: string;
  url: string;
}

interface ExperienceSeed {
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  achievements: string[];
  skills: SkillName[];
}

interface ProjectSeed {
  name: string;
  description: string;
  url: string | null;
  skills: SkillName[];
}

export interface ProfileSeed {
  slug: string;
  name: string;
  headline: string;
  description: string;
  location: string;
  links: LinkSeed[];
  experiences: ExperienceSeed[];
  projects: ProjectSeed[];
}

export const profileSeed: ProfileSeed = {
  slug: 'danil-malkov',
  name: 'Данил Мальков',
  headline: 'Fullstack-разработчик React & NestJS (ERP и Enterprise системы)',
  description:
    'Более 3 лет занимаюсь продуктовой разработкой ERP и enterprise-систем: ' +
    'проектирую высоконагруженные WMS- и CRM-платформы на React и NestJS, ' +
    'ускоряю интерфейсы и запросы к БД, перевожу тяжёлые процессы на очереди и WebSockets. ' +
    'Работаю по Spec-Driven Development с AI-инструментами, сохраняя покрытие критического пути тестами.',
  location: 'Россия (удалённо)',
  links: [
    { type: 'GITHUB', label: 'GitHub', url: 'https://github.com/illidania' },
    { type: 'TELEGRAM', label: 'Telegram', url: 'https://t.me/ilydanM' },
    {
      type: 'EMAIL',
      label: 'Email',
      url: 'mailto:danilmalkov@proton.me',
    },
  ],
  experiences: [
    {
      company: 'Major Fulfillment',
      position: 'Fullstack-разработчик (React / NestJS)',
      location: 'Удалённо, Россия',
      startDate: new Date('2024-07-01'),
      endDate: new Date('2026-09-01'),
      achievements: [
        'Проектировал и поддерживал высоконагруженную WMS-платформу, управляющую 100+ тыс. SKU, и B2B-портал для более чем 1200 селлеров маркетплейсов (Wildberries, Ozon, Яндекс Маркет).',
        'Устранил проблему оверселлинга, спроектировав модуль резервирования остатков на NestJS, Prisma и RabbitMQ со строгой изоляцией транзакций и очередями синхронизации — штрафы за отмену заказов снизились до нуля.',
        'Сократил Total Blocking Time на 70% в браузерах складских терминалов: таблица сборки заказов на TanStack Table с виртуализацией строк (react-virtual) и синхронизацией состояния с URL.',
        'Снизил нагрузку на сервер при валидации входящих поставок на 40% и количество обращений в техподдержку на 35%: многошаговый мастер отгрузок (React Hook Form, Zod) с клиентской валидацией CSV/Excel до 50 000 строк в Web Workers.',
        'Перевёл отслеживание заказов с HTTP-polling на WebSockets (NestJS Gateways + Socket.io): фоновый RPS к базе данных упал на 30%, реакция диспетчеров ускорилась в 4 раза.',
        'Ускорил Time-to-Market новых фич на 30% за счёт Spec-Driven Development и AI-инструментов (Cursor, Claude Code), сохранив покрытие критического пути тестами (Vitest, Playwright) выше 80%.',
      ],
      skills: [
        'TypeScript',
        'React 18/19',
        'NestJS',
        'Prisma ORM',
        'RabbitMQ',
        'WebSockets',
        'TanStack Table',
        'React Hook Form',
        'Zod',
        'Vitest',
        'Playwright',
        'Spec-Driven Development',
        'AI-Driven Development',
      ],
    },
    {
      company: 'ИнтернетУрок',
      position: 'Fullstack-разработчик (React, Python/Django)',
      location: 'Удалённо, Россия',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2024-07-01'),
      achievements: [
        'Разрабатывал внутренние CRM/ERP-системы и портал самообслуживания для 2000+ активных преподавателей ежедневно: глобальное расписание, учёт рабочего времени, автоматический расчёт заработной платы.',
        'Переработал ядро календаря расписаний на CSS Grid, перевёл все вычисления времени в UTC (date-fns): устранил рассинхронизацию часовых поясов при многодневных событиях и зависания UI при рендеринге сотен слотов.',
        'Интегрировал WebSocket-синхронизацию в процесс бронирования: тайм-слоты мгновенно блокируются при оформлении заказа, что исключило race conditions и двойные бронирования.',
        'Создал таблицу биллинга (Ant Design) с многокритериальной фильтрацией, группировкой и обработкой споров внутри строк — обращения репетиторов в бухгалтерию и поддержку снизились на 35–40%.',
        'Устранил N+1 запросы в Django ORM через select_related: генерация серверных отчётов ускорилась с 7–8 до 0.5 секунды (в 15 раз).',
        'Реализовал асинхронный экспорт тяжёлых файлов через фоновые задачи Celery с поллингом и индикаторами прогресса, устранив Gateway Timeout при выгрузке годовых отчётов.',
      ],
      skills: [
        'React 18/19',
        'Python 3',
        'Django REST Framework',
        'Celery',
        'Ant Design',
        'WebSockets',
        'Performance Optimization',
      ],
    },
  ],
  projects: [
    {
      name: 'Цифровая визитка (этот проект)',
      description:
        'GraphQL-бэкенд визитки: NestJS, Prisma, PostgreSQL, Docker. ' +
        'Вложенные данные грузятся через DataLoader без N+1, схема БД и данные подготавливаются автоматически при старте.',
      url: 'https://github.com/illidania/danil-malkov-card',
      skills: [
        'TypeScript',
        'Node.js',
        'NestJS',
        'GraphQL',
        'Prisma ORM',
        'PostgreSQL',
        'Docker',
        'Git',
      ],
    },
    {
      name: 'WMS-платформа (Major Fulfillment)',
      description:
        'Высоконагруженная система управления складом: 100+ тыс. SKU, резервирование остатков без оверселлинга, ' +
        'отслеживание заказов в реальном времени. Коммерческий проект, код закрыт.',
      url: null,
      skills: [
        'NestJS',
        'Prisma ORM',
        'RabbitMQ',
        'React 18/19',
        'WebSockets',
        'TanStack Table',
      ],
    },
    {
      name: 'B2B-портал для селлеров маркетплейсов (Major Fulfillment)',
      description:
        'Портал для 1200+ селлеров Wildberries, Ozon и Яндекс Маркета: многошаговый мастер отгрузок с проверкой CSV/Excel до 50 000 строк на клиенте. Коммерческий проект, код закрыт.',
      url: null,
      skills: [
        'React 18/19',
        'React Hook Form',
        'Zod',
        'TypeScript',
        'Playwright',
      ],
    },
    {
      name: 'CRM/ERP и портал преподавателей (ИнтернетУрок)',
      description:
        'Расписание, бронирование слотов, учёт времени и автоматический расчёт зарплаты для 2000+ преподавателей. Коммерческий проект, код закрыт.',
      url: null,
      skills: [
        'React 18/19',
        'Django REST Framework',
        'Celery',
        'Ant Design',
        'WebSockets',
      ],
    },
  ],
};
