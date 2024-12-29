import { gql } from '../__generated__/gql';

export const AUTHENTICATE_WITH_CODE = gql(/* GraphQL */ `
  mutation AuthenticateWithCode($code: String!) {
    authenticateWithCode(code: $code) {
      user {
        id
        name
        email
        profilePicture
        createdAt
        updatedAt
      }
      refreshToken
      accessToken
    }
  }
`);
