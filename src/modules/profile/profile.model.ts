import { Field, Int, ObjectType } from '@nestjs/graphql';

// Связанные поля (links, skills, experience, projects) — в ProfileResolver:
// они вычисляются лениво и только если клиент их запросил.
@ObjectType('Profile', { description: 'Цифровая визитка специалиста' })
export class ProfileModel {
  @Field(() => Int)
  id: number;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field({ description: 'Специализация в одну строку' })
  headline: string;

  @Field({ description: 'Краткое описание' })
  description: string;

  @Field(() => String, { nullable: true })
  location: string | null;
}
