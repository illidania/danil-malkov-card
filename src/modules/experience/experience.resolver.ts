import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { formatPeriod } from '../../common/format-period.js';
import { Loaders } from '../../graphql/loaders/loaders.decorator.js';
import type { GraphQLLoaders } from '../../graphql/loaders/loaders.types.js';
import { SkillModel } from '../skills/skill.model.js';
import { ExperienceModel } from './experience.model.js';

@Resolver(() => ExperienceModel)
export class ExperienceResolver {
  @ResolveField(() => String, {
    description:
      'Период работы в читаемом виде, например «Июль 2024 – Сентябрь 2026»',
  })
  period(@Parent() experience: ExperienceModel): string {
    return formatPeriod(experience.startDate, experience.endDate);
  }

  @ResolveField(() => Boolean)
  isCurrent(@Parent() experience: ExperienceModel): boolean {
    return experience.endDate === null;
  }

  @ResolveField(() => [SkillModel], {
    description: 'Технологии, использованные на этой позиции',
  })
  skills(
    @Parent() experience: ExperienceModel,
    @Loaders() loaders: GraphQLLoaders,
  ) {
    return loaders.skillsByExperienceId.load(experience.id);
  }
}
