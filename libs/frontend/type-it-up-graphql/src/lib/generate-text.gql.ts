import { gql } from '../__generated__/gql';

export const GENERATE_TEXT = gql(/* GraphQL */ `
  query GenerateText($difficulty: Difficulty) {
    generateText(difficulty: $difficulty) {
      success
      data {
        text
        words
        length
      }
    }
  }
`); 