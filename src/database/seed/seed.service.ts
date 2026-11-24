import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { ProfileSeed, SkillName } from './profile.data.js';
import { skillsByCategory } from './profile.data.js';
import type { SkillCategory } from '../../generated/prisma/enums.js';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Идемпотентно приводит БД к состоянию `data`: профиль пересоздаётся целиком
   * в одной транзакции (каскадное удаление), поэтому повторный запуск безопасен,
   * а читатели никогда не видят «половину» данных.
   */
  async seedProfile(data: ProfileSeed): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.profile.deleteMany({ where: { slug: data.slug } });

      const skills = Object.entries(skillsByCategory).flatMap(
        ([category, names]) =>
          names.map((name, sortOrder) => ({
            name,
            sortOrder,
            category: category as SkillCategory,
          })),
      );

      const profile = await tx.profile.create({
        data: {
          slug: data.slug,
          name: data.name,
          headline: data.headline,
          description: data.description,
          location: data.location,
          links: {
            create: data.links.map((link, sortOrder) => ({
              ...link,
              sortOrder,
            })),
          },
          skills: { create: skills },
        },
        include: { skills: { select: { id: true, name: true } } },
      });

      const skillIds = new Map<string, number>(
        profile.skills.map((skill) => [skill.name, skill.id]),
      );
      const connect = (names: SkillName[]) =>
        names.map((name) => ({ id: skillIds.get(name)! }));

      for (const { skills: names, ...experience } of data.experiences) {
        await tx.experience.create({
          data: {
            ...experience,
            profileId: profile.id,
            skills: { connect: connect(names) },
          },
        });
      }

      for (const [
        sortOrder,
        { skills: names, ...project },
      ] of data.projects.entries()) {
        await tx.project.create({
          data: {
            ...project,
            sortOrder,
            profileId: profile.id,
            skills: { connect: connect(names) },
          },
        });
      }
    });

    this.logger.log(`Profile "${data.slug}" seeded`);
  }
}
