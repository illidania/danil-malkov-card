import { Injectable } from '@nestjs/common';
import { groupByKey } from '../../common/group-by-key.js';
import type { Prisma, Skill } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

const DISPLAY_ORDER: Prisma.SkillOrderByWithRelationInput[] = [
  { category: 'asc' },
  { sortOrder: 'asc' },
];

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileIds(profileIds: readonly number[]): Promise<Skill[][]> {
    const skills = await this.prisma.skill.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: DISPLAY_ORDER,
    });
    return groupByKey(profileIds, skills, (skill) => skill.profileId);
  }

  /** Технологии, использованные на местах работы (many-to-many). */
  async findByExperienceIds(
    experienceIds: readonly number[],
  ): Promise<Skill[][]> {
    const rows = await this.prisma.experience.findMany({
      where: { id: { in: [...experienceIds] } },
      select: { id: true, skills: { orderBy: DISPLAY_ORDER } },
    });
    const byId = new Map(rows.map((row) => [row.id, row.skills]));
    return experienceIds.map((id) => byId.get(id) ?? []);
  }

  /** Технологии, использованные в проектах (many-to-many). */
  async findByProjectIds(projectIds: readonly number[]): Promise<Skill[][]> {
    const rows = await this.prisma.project.findMany({
      where: { id: { in: [...projectIds] } },
      select: { id: true, skills: { orderBy: DISPLAY_ORDER } },
    });
    const byId = new Map(rows.map((row) => [row.id, row.skills]));
    return projectIds.map((id) => byId.get(id) ?? []);
  }
}
