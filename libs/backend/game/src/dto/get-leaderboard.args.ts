import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

export enum LeaderboardSortType {
  BEST_SCORE = 'BEST_SCORE',
  AVERAGE_SCORE = 'AVERAGE_SCORE'
}

registerEnumType(LeaderboardSortType, {
  name: 'LeaderboardSortType',
  description: 'Sort type for leaderboard - either by best score or average score',
});

@ArgsType()
export class GetLeaderboardArgs {
  @Field(() => LeaderboardSortType)
  @IsEnum(LeaderboardSortType)
  sortType!: LeaderboardSortType;
} 