import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { ExperienceService } from '../../modules/experience/experience.service.js';
import { LinksService } from '../../modules/links/links.service.js';
import { ProjectsService } from '../../modules/projects/projects.service.js';
import { SkillsService } from '../../modules/skills/skills.service.js';
import type { GraphQLLoaders } from './loaders.types.js';

/**
 * Собирает DataLoader-ы поверх сервисов. Loader-ы привязаны к запросу (кеш не
 * «протекает» между пользователями), а каждый батч превращается в один запрос к БД.
 */
@Injectable()
export class LoadersFactory {
  constructor(
    private readonly links: LinksService,
    private readonly skills: SkillsService,
    private readonly experience: ExperienceService,
    private readonly projects: ProjectsService,
  ) {}

  create(): GraphQLLoaders {
    return {
      linksByProfileId: new DataLoader((ids) =>
        this.links.findByProfileIds(ids),
      ),
      skillsByProfileId: new DataLoader((ids) =>
        this.skills.findByProfileIds(ids),
      ),
      experienceByProfileId: new DataLoader((ids) =>
        this.experience.findByProfileIds(ids),
      ),
      projectsByProfileId: new DataLoader((ids) =>
        this.projects.findByProfileIds(ids),
      ),
      skillsByExperienceId: new DataLoader((ids) =>
        this.skills.findByExperienceIds(ids),
      ),
      skillsByProjectId: new DataLoader((ids) =>
        this.skills.findByProjectIds(ids),
      ),
    };
  }
}
