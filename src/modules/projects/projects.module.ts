import { Module } from '@nestjs/common';
import { ProjectsResolver } from './projects.resolver.js';
import { ProjectsService } from './projects.service.js';

@Module({
  providers: [ProjectsService, ProjectsResolver],
  exports: [ProjectsService],
})
export class ProjectsModule {}
