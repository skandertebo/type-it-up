import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class GeneratedTextData {
  @Field(() => String)
  text!: string;

  @Field(() => [String])
  words!: string[];

  @Field(() => Number)
  length!: number;
}

@ObjectType()
export class GeneratedTextResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => GeneratedTextData)
  data!: GeneratedTextData;
} 

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

registerEnumType(Difficulty, {
  name: 'Difficulty',
  description: 'The difficulty of the text',
});