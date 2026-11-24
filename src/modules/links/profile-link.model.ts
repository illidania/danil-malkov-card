import { Field, Int, ObjectType } from '@nestjs/graphql';
import { LinkType } from '../../generated/prisma/enums.js';

@ObjectType('ProfileLink', { description: 'Ссылка на профессиональный ресурс' })
export class ProfileLinkModel {
  @Field(() => Int)
  id: number;

  @Field(() => LinkType)
  type: LinkType;

  @Field({ description: 'Подпись для отображения, например «GitHub»' })
  label: string;

  @Field()
  url: string;
}
