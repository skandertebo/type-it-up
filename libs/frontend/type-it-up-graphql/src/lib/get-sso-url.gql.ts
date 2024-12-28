import { gql } from '../__generated__/gql';

export const GET_SSO_URL = gql(/* GraphQL */ `
  query GetSSOUrl($organizationId: String!) {
    getSSOUrl(organizationId: $organizationId)
  }
`);
