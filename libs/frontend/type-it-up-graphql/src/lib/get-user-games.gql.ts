import { gql } from '../__generated__/gql';

export const GET_USER_GAMES = gql(/* GraphQL */ `
  query GetUserGames {
    getUserGames {
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