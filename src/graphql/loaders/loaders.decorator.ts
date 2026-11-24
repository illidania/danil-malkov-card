import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { GraphQLContext, GraphQLLoaders } from './loaders.types.js';

/** Достаёт DataLoader-ы текущего запроса из GraphQL-контекста. */
export const Loaders = createParamDecorator(
  (_data: unknown, context: ExecutionContext): GraphQLLoaders =>
    GqlExecutionContext.create(context).getContext<GraphQLContext>().loaders,
);
