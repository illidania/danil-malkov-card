# Цифровая визитка — Данил Мальков

GraphQL-бэкенд, который представляет меня как специалиста: профиль, навыки, опыт работы и проекты.
**NestJS · TypeScript · GraphQL (Apollo) · Prisma · PostgreSQL · Docker**

- **Demo / Apollo Sandbox:** _см. ссылку в сообщении с тестовым заданием_ (`/graphql`)
- **Исходный код:** https://github.com/illidania/danil-malkov-card

## Быстрый старт (с нуля одной командой)

```bash
docker compose up --build
```

Откройте http://localhost:3000 — откроется Apollo Sandbox. При старте контейнер сам:

1. применяет миграции (`prisma migrate deploy`),
2. заполняет БД данными визитки (`npm run db:seed`),
3. запускает приложение.

Оба шага идемпотентны: перезапуск не ломает и не дублирует данные.

### Пример запроса

```graphql
query {
  profile {
    name
    description
    links { type url }
    skills { name category }
    experience {
      company
      position
      period
      achievements
      skills { name }
    }
    projects { name url skills { name } }
  }
}
```

Также доступны `profile(slug: "danil-malkov")` и `GET /health` (проба БД для оркестратора).

## Локальная разработка

```bash
cp .env.example .env
docker compose up -d db      # только PostgreSQL
npm ci
npm run build                # prisma generate + компиляция
npm run db:setup             # миграции + сиды
npm run start:dev            # watch-режим; схема пишется в schema.gql
npm test                     # unit-тесты
```

`LOG_QUERIES=true` печатает SQL — удобно смотреть, как работает батчинг.

## Архитектура

```
src/
├── config/            валидация env (zod) + типизированный AppConfigService
├── prisma/            PrismaService (Prisma 7 + driver adapter pg)
├── modules/           предметные модули: profile, links, skills, experience, projects
│   └── <module>/      *.model.ts (GraphQL-тип) · *.service.ts (доступ к данным) · *.resolver.ts
├── graphql/           настройка Apollo + Sandbox, DataLoader-ы на запрос
├── database/seed/     данные визитки (profile.data.ts) и идемпотентный SeedService
├── health/            GET /health и редирект / → /graphql
└── common/            чистые функции (groupByKey, formatPeriod) с тестами
```

**Разделение ответственности**

| Слой | Знает про | Не знает про |
| --- | --- | --- |
| Резолвер | GraphQL, DataLoader-ы | Prisma, SQL |
| Сервис | Prisma, правила выборки/сортировки | GraphQL |
| `LoadersFactory` | сервисы, DataLoader | схему GraphQL |

**Вложенные данные без N+1.** Связанные поля (`links`, `skills`, `experience`, `projects`,
а также `skills` у опыта и проектов) — `@ResolveField`, которые берут данные из DataLoader-ов.
Loader-ы создаются на каждый запрос (`context`), собирают id за тик event loop и делают **один**
запрос `WHERE ... IN (...)` на коллекцию. Поэтому количество SQL-запросов зависит от формы GraphQL-запроса,
а не от количества записей: невостребованные поля не стоят ни одного запроса. Для двух мест работы и четырёх проектов
полный запрос из примера выше — 9 SQL-запросов (проверяется через `LOG_QUERIES=true`).

**База данных.** Схема в `prisma/schema.prisma`, миграции в `prisma/migrations`. Enum-ы Prisma — единственный
источник истины и для БД, и для GraphQL. Навыки связаны many-to-many с опытом и проектами. Индексы
подобраны под выборки по `profileId`.

**Сиды.** Сид пересоздаёт профиль целиком в одной транзакции (каскадное удаление): так содержимое API всегда
совпадает с `profile.data.ts`, а читатели не видят полузаполненное состояние. Названия навыков в данных проверяются
на опечатки компилятором.

## Деплой

Образ собирается из `Dockerfile` (multi-stage, запуск от непривилегированного пользователя, healthcheck).
Нужны только переменные `DATABASE_URL` и (опционально) `PORT`. Для Render есть `render.yaml` (Blueprint).
