import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module.js';
import { AppGraphQLModule } from './graphql/graphql.module.js';
import { HealthModule } from './health/health.module.js';
import { ExperienceModule } from './modules/experience/experience.module.js';
import { LinksModule } from './modules/links/links.module.js';
import { ProfileModule } from './modules/profile/profile.module.js';
import { ProjectsModule } from './modules/projects/projects.module.js';
import { SkillsModule } from './modules/skills/skills.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    LinksModule,
    SkillsModule,
    ExperienceModule,
    ProjectsModule,
    ProfileModule,
    AppGraphQLModule,
    HealthModule,
  ],
})
export class AppModule {}
