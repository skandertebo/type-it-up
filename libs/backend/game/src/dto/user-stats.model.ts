import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DailyStats {
  @Field(() => Date)
  date!: Date;

  @Field(() => Float)
  averageWpm!: number;

  @Field(() => Float)
  averageAccuracy!: number;
}

@ObjectType()
export class UserGameStats {
  @Field(() => Float)
  averageWpm!: number;

  @Field(() => Float)
  averageAccuracy!: number;

  @Field(() => Float)
  highestScore!: number;

  @Field(() => [DailyStats])
  dailyStats!: DailyStats[];
}
