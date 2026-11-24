import { Injectable } from '@nestjs/common';
import { groupByKey } from '../../common/group-by-key.js';
import type { ProfileLink } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  /** Один запрос для любого количества профилей. */
  async findByProfileIds(
    profileIds: readonly number[],
  ): Promise<ProfileLink[][]> {
    const links = await this.prisma.profileLink.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: { sortOrder: 'asc' },
    });
    return groupByKey(profileIds, links, (link) => link.profileId);
  }
}
