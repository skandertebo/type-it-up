import { gql } from '../__generated__/gql';

export const CHECK_USERNAME_EXISTS = gql(/* GraphQL */ `
  query CheckUsernameExists($username: String!) {
    checkUsernameExists(username: $username)
  }
`);
