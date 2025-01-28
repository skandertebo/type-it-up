import { LeaderboardSortType, SortOrder } from '@/frontend/type-it-up-graphql';

export type Filter = {
  sortBy: LeaderboardSortType;
  sortOrder: SortOrder;
  limit: number;
  offset: number;
};
