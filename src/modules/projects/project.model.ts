import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Project', { description: 'Проект' })
export class ProjectModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String, {
    nullable: true,
    description:
      'Ссылка на репозиторий или деплой; у закрытых коммерческих проектов её нет',
  })
  url: string | null;
}
