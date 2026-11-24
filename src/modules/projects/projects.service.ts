import { Injectable } from '@nestjs/common';
import { groupByKey } from '../../common/group-by-key.js';
import type { Project } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileIds(profileIds: readonly number[]): Promise<Project[][]> {
    const projects = await this.prisma.project.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: { sortOrder: 'asc' },
    });
    return groupByKey(profileIds, projects, (project) => project.profileId);
  }
}
