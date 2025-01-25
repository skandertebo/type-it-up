import { gql } from '../__generated__/gql';

export const LOGIN = gql(/* GraphQL */ `
  mutation Login($email: String!, $password: String!) {
    authenticateWithUserPassword(email: $email, password: $password) {
      user {
        id
        email
        firstName
        lastName
        username
        workosId
        profilePicture
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
    }
  }
`); 