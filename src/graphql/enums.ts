import { registerEnumType } from '@nestjs/graphql';
import { LinkType, SkillCategory } from '../generated/prisma/enums.js';

// Enum-ы Prisma — единственный источник истины, в GraphQL-схему они только регистрируются.
registerEnumType(LinkType, { name: 'LinkType' });
registerEnumType(SkillCategory, {
  name: 'SkillCategory',
  description: 'Группа, к которой относится навык',
});
