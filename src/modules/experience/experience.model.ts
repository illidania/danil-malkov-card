import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

// Поля `period`, `isCurrent` и `skills` объявлены в ExperienceResolver как вычисляемые.
@ObjectType('Experience', { description: 'Место работы' })
export class ExperienceModel {
  @Field(() => Int)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field(() => String, { nullable: true })
  location: string | null;

  @Field(() => GraphQLISODateTime)
  startDate: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'null — работает по настоящее время',
  })
  endDate: Date | null;

  @Field(() => [String], { description: 'Ключевые достижения' })
  achievements: string[];
}
