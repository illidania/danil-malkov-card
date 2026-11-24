import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'node:path';
import { AppConfigService } from '../config/app-config.service.js';
import './enums.js';
import { LoadersFactory } from './loaders/loaders.factory.js';
import { LoadersModule } from './loaders/loaders.module.js';
import type { GraphQLContext } from './loaders/loaders.types.js';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [LoadersModule],
      inject: [AppConfigService, LoadersFactory],
      useFactory: (config: AppConfigService, loaders: LoadersFactory) => ({
        // Code-first: схема строится из декораторов. Вне production дополнительно
        // пишется в schema.gql, чтобы её было удобно читать и ревьюить.
        autoSchemaFile: config.isProduction
          ? true
          : join(process.cwd(), 'schema.gql'),
        sortSchema: true,
        // Sandbox работает через introspection, поэтому оставляем её и в production
        // — это публичная визитка, скрывать схему незачем.
        introspection: true,
        // Отключаем встроенный GraphiQL Nest: вместо него — Apollo Sandbox (плагин ниже).
        graphiql: false,
        plugins: [
          // Встроенный Apollo Sandbox на GET /graphql
          ApolloServerPluginLandingPageLocalDefault({
            embed: true,
            includeCookies: false,
          }),
        ],
        // Новый набор DataLoader-ов на каждый запрос.
        context: (): GraphQLContext => ({ loaders: loaders.create() }),
      }),
    }),
  ],
})
export class AppGraphQLModule {}
