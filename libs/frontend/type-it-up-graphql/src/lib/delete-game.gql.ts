import { gql } from '../__generated__/gql';

export const DELETE_GAME = gql(/* GraphQL */ `
  mutation DeleteGame($id: String!) {
    deleteGame(id: $id)
  }
`); 