import { User } from '@/backend/auth';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LeaderboardEntry {
  @Field(() => User)
  user!: User;

  @Field(() => Float)
  bestScore!: number;

  @Field(() => Float)
  averageScore!: number;

  @Field(() => Float)
  averageWpm!: number;

  @Field(() => Float)
  averageAccuracy!: number;
}
