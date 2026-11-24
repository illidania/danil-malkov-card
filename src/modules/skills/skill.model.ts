import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SkillCategory } from '../../generated/prisma/enums.js';

@ObjectType('Skill', { description: 'Навык или технология' })
export class SkillModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => SkillCategory)
  category: SkillCategory;
}
