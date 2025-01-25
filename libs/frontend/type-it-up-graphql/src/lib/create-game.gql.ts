import { gql } from '../__generated__/gql';

export const CREATE_GAME = gql(/* GraphQL */ `
  mutation CreateGame($createGameInput: CreateGameInput!) {
    createGame(createGameInput: $createGameInput) {
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