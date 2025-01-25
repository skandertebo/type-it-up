import { gql } from '../__generated__/gql';

export const GET_LEADERBOARD = gql(/* GraphQL */ `
  query GetLeaderboard($sortType: LeaderboardSortType!) {
    getLeaderboard(sortType: $sortType) {
      user {
        id
        username
        firstName
        lastName
        workosId
      }
      score
    }
  }
`); 