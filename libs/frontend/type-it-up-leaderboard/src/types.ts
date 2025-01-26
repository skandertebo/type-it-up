import { LeaderboardSortType, SortOrder } from '@/frontend/type-it-up-graphql';

export type Filter = {
  sortBy: LeaderboardSortType;
  sortOrder: SortOrder;
  page: number;
};

export type PlayerStat = {
  rank: number;
  name: string;
  bestScore: number;
  avgScore: number;
  wpm: number;
  accuracy: number;
};
