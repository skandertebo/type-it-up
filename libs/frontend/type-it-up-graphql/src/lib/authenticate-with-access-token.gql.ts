import { gql } from '../__generated__/gql';

export const AUTHENTICATE_WITH_ACCESS_TOKEN = gql(/* GraphQL */ `
  mutation AuthenticateWithAccessToken {
    authenticateWithAccessToken {
      id
      username
      firstName
      lastName
      email
      profilePicture
      createdAt
      updatedAt
    }
  }
`);
