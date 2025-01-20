import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class GameOptionsInput {
  @Field(() => String)
  difficulty!: string;

  @Field(() => Boolean)
  punctuation!: boolean;

  @Field(() => Boolean)
  numbers!: boolean;
}

@InputType()
export class CreateGameInput {
  @Field(() => GameOptionsInput)
  options!: {
    difficulty: string;
    punctuation: boolean;
    numbers: boolean;
  };

  @Field(() => String)
  gameContent!: string;

  @Field(() => String)
  userContent!: string;

  @Field(() => Number)
  duration!: number;

  @Field(() => Float)
  wpm!: number;

  @Field(() => Float)
  accuracy!: number;
} 