# syntax=docker/dockerfile:1

# ---- build: зависимости, генерация Prisma Client, компиляция TypeScript ----
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# prisma generate читает prisma.config.ts, где нужен DATABASE_URL; реального подключения при сборке нет
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build npm run build
RUN npm prune --omit=dev

# ---- runtime ----
FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/package.json ./package.json
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh && chown -R node:node /app
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD wget -qO- "http://127.0.0.1:${PORT:-3000}/health" || exit 1
ENTRYPOINT ["./docker-entrypoint.sh"]
