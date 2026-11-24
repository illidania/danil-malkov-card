import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loaders } from '../../graphql/loaders/loaders.decorator.js';
import type { GraphQLLoaders } from '../../graphql/loaders/loaders.types.js';
import { SkillModel } from '../skills/skill.model.js';
import { ProjectModel } from './project.model.js';

@Resolver(() => ProjectModel)
export class ProjectsResolver {
  @ResolveField(() => [SkillModel], {
    description: 'Технологии проекта',
  })
  skills(@Parent() project: ProjectModel, @Loaders() loaders: GraphQLLoaders) {
    return loaders.skillsByProjectId.load(project.id);
  }
}
