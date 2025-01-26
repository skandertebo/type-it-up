import { gql } from '../__generated__/gql';

export const SIGNUP = gql(/* GraphQL */ `
  mutation Signup(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $username: String!
  ) {
    registerUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      username: $username
    ) {
      user {
        id
        email
        firstName
        lastName
        username
        profilePicture
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
    }
  }
`); 