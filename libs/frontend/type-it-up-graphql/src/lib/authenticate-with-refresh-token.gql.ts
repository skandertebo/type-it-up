import { gql } from '../__generated__/gql';

export const AUTHENTICATE_WITH_REFRESH_TOKEN = gql(/* GraphQL */ `
  mutation AuthenticateWithRefreshToken($refreshToken: String!) {
    authenticateWithRefreshToken(refreshToken: $refreshToken) {
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
