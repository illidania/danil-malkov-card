import { Injectable, NotFoundException } from '@nestjs/common';
import type { Profile } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  /** Профиль по slug; без slug — основной (первый созданный) профиль. */
  async getProfile(slug?: string): Promise<Profile> {
    const profile = slug
      ? await this.prisma.profile.findUnique({ where: { slug } })
      : await this.prisma.profile.findFirst({ orderBy: { id: 'asc' } });

    if (!profile) {
      throw new NotFoundException(
        slug
          ? `Profile "${slug}" not found`
          : 'No profile has been created yet',
      );
    }
    return profile;
  }
}
