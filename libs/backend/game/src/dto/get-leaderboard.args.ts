import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { SortOrder } from './get-game-history.args';

export enum LeaderboardSortType {
  BEST_SCORE = 'BEST_SCORE',
  AVERAGE_SCORE = 'AVERAGE_SCORE',
}

registerEnumType(LeaderboardSortType, {
  name: 'LeaderboardSortType',
  description:
    'Sort type for leaderboard - either by best score or average score',
});

@ArgsType()
export class GetLeaderboardArgs {
  @Field(() => LeaderboardSortType)
  @IsEnum(LeaderboardSortType)
  sortType!: LeaderboardSortType;

  @Field(() => SortOrder)
  @IsEnum(SortOrder)
  sortOrder!: SortOrder;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit!: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  offset!: number;
}
