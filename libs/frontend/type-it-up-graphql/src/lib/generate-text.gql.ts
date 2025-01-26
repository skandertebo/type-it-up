import { gql } from '../__generated__/gql';

export const GENERATE_TEXT = gql(/* GraphQL */ `
  query GenerateText($difficulty: Difficulty, $punctuation: Boolean, $numbers: Boolean) {
    generateText(difficulty: $difficulty, punctuation: $punctuation, numbers: $numbers) {
      success
      data {
        text
        words
        length
      }
    }
  }
`);
