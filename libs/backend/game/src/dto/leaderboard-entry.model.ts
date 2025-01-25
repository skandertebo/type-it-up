import { User } from '@/backend/auth';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LeaderboardEntry {
  @Field(() => User)
  user!: User;

  @Field(() => Float)
  score!: number;
} 