import { gql } from '../__generated__/gql';

export const GET_USER_STATS = gql(/* GraphQL */ `
  query GetUserStats {
    getUserStats {
      averageWpm
      averageAccuracy
      highestScore
      dailyStats {
        date
        averageWpm
        averageAccuracy
      }
    }
  }
`);
