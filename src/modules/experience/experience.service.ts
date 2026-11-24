import { Injectable } from '@nestjs/common';
import { groupByKey } from '../../common/group-by-key.js';
import type { Experience } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  /** Опыт работы, от самого свежего места к самому раннему. */
  async findByProfileIds(
    profileIds: readonly number[],
  ): Promise<Experience[][]> {
    const experiences = await this.prisma.experience.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: { startDate: 'desc' },
    });
    return groupByKey(profileIds, experiences, (item) => item.profileId);
  }
}
