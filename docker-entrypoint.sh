#!/bin/sh
# Подготовка БД при каждом старте: миграции -> сиды -> приложение.
# Оба шага идемпотентны, поэтому запуск «с нуля» и перезапуск ведут себя одинаково.
set -e

echo "[entrypoint] applying migrations"
npx prisma migrate deploy

echo "[entrypoint] seeding database"
node dist/database/seed/run-seed.js

echo "[entrypoint] starting application"
exec node dist/main.js
