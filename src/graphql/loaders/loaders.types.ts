import type DataLoader from 'dataloader';
import type {
  Experience,
  ProfileLink,
  Project,
  Skill,
} from '../../generated/prisma/client.js';

/**
 * Набор DataLoader-ов, создаваемый заново на каждый GraphQL-запрос.
 * Ключ — id родительской сущности, значение — её дочерние записи.
 */
export interface GraphQLLoaders {
  linksByProfileId: DataLoader<number, ProfileLink[]>;
  skillsByProfileId: DataLoader<number, Skill[]>;
  experienceByProfileId: DataLoader<number, Experience[]>;
  projectsByProfileId: DataLoader<number, Project[]>;
  skillsByExperienceId: DataLoader<number, Skill[]>;
  skillsByProjectId: DataLoader<number, Skill[]>;
}

export interface GraphQLContext {
  loaders: GraphQLLoaders;
}
