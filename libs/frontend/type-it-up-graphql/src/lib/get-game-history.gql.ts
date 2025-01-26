import { gql } from '../__generated__/gql';

export const GET_GAME_HISTORY = gql(/* GraphQL */ `
  query GetGameHistory(
    $since: DateTime
    $until: DateTime
    $difficulty: String
    $sortOrder: SortOrder
  ) {
    getGameHistory(
      since: $since
      until: $until
      difficulty: $difficulty
      sortOrder: $sortOrder
    ) {
      id
      options {
        difficulty
        punctuation
        numbers
      }
      gameContent
      userContent
      duration
      wpm
      accuracy
      score
      createdAt
      users {
        id
        username
        firstName
        lastName
        workosId
      }
    }
  }
`); 