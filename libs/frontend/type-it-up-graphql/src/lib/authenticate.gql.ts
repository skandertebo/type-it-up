import { gql } from '../__generated__/gql';

export const AUTHENTICATE = gql(/* GraphQL */ `
  mutation Authenticate($code: String!) {
    authenticate(code: $code)
  }
`);
