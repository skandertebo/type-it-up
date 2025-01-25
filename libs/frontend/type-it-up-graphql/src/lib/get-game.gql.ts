import { gql } from '../__generated__/gql';

export const GET_GAME = gql(/* GraphQL */ `
  query GetGame($id: String!) {
    getGame(id: $id) {
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