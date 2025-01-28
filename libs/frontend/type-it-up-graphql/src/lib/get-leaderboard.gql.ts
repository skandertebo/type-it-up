import { gql } from '../__generated__/gql';

export const GET_LEADERBOARD = gql(/* GraphQL */ `
  query GetLeaderboard(
    $sortType: LeaderboardSortType!
    $sortOrder: SortOrder!
    $limit: Int!
    $offset: Int!
  ) {
    getLeaderboard(
      sortType: $sortType
      sortOrder: $sortOrder
      limit: $limit
      offset: $offset
    ) {
      user {
        id
        username
        firstName
        lastName
        workosId
      }
      averageWpm
      averageAccuracy
      averageScore
      bestScore
    }
  }
`);
