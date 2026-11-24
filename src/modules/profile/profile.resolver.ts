import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Loaders } from '../../graphql/loaders/loaders.decorator.js';
import type { GraphQLLoaders } from '../../graphql/loaders/loaders.types.js';
import { ExperienceModel } from '../experience/experience.model.js';
import { ProfileLinkModel } from '../links/profile-link.model.js';
import { ProjectModel } from '../projects/project.model.js';
import { SkillModel } from '../skills/skill.model.js';
import { ProfileModel } from './profile.model.js';
import { ProfileService } from './profile.service.js';

/**
 * Резолвер ничего не знает про БД: корневой профиль берёт у сервиса,
 * а вложенные коллекции — через DataLoader-ы (батчинг, без N+1).
 */
@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profiles: ProfileService) {}

  @Query(() => ProfileModel, {
    description: 'Профиль владельца визитки. Без slug возвращается основной.',
  })
  profile(@Args('slug', { type: () => String, nullable: true }) slug?: string) {
    return this.profiles.getProfile(slug);
  }

  @ResolveField(() => [ProfileLinkModel], {
    description: 'GitHub, Telegram, e-mail и другие ресурсы',
  })
  links(@Parent() profile: ProfileModel, @Loaders() loaders: GraphQLLoaders) {
    return loaders.linksByProfileId.load(profile.id);
  }

  @ResolveField(() => [SkillModel], {
    description: 'Навыки, сгруппированные по категориям',
  })
  skills(@Parent() profile: ProfileModel, @Loaders() loaders: GraphQLLoaders) {
    return loaders.skillsByProfileId.load(profile.id);
  }

  @ResolveField(() => [ExperienceModel], {
    description: 'Опыт работы, от новых позиций к старым',
  })
  experience(
    @Parent() profile: ProfileModel,
    @Loaders() loaders: GraphQLLoaders,
  ) {
    return loaders.experienceByProfileId.load(profile.id);
  }

  @ResolveField(() => [ProjectModel])
  projects(
    @Parent() profile: ProfileModel,
    @Loaders() loaders: GraphQLLoaders,
  ) {
    return loaders.projectsByProfileId.load(profile.id);
  }
}
