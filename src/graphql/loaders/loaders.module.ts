import { Module } from '@nestjs/common';
import { ExperienceModule } from '../../modules/experience/experience.module.js';
import { LinksModule } from '../../modules/links/links.module.js';
import { ProjectsModule } from '../../modules/projects/projects.module.js';
import { SkillsModule } from '../../modules/skills/skills.module.js';
import { LoadersFactory } from './loaders.factory.js';

@Module({
  imports: [LinksModule, SkillsModule, ExperienceModule, ProjectsModule],
  providers: [LoadersFactory],
  exports: [LoadersFactory],
})
export class LoadersModule {}
