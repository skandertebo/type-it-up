/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthResult = {
  __typename?: 'AuthResult';
  /** The authenticated user. */
  accessToken: Scalars['String']['output'];
  /** The authenticated user. */
  refreshToken: Scalars['String']['output'];
  /** The authenticated user. */
  user: User;
};

export type HelloWorldSchema = {
  __typename?: 'HelloWorldSchema';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateWithAccessToken: User;
  authenticateWithCode: AuthResult;
  authenticateWithRefreshToken: AuthResult;
};


export type MutationAuthenticateWithCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationAuthenticateWithRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  sayHello: HelloWorldSchema;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  workosId: Scalars['String']['output'];
};

export type AuthenticateWithAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthenticateWithAccessTokenMutation = { __typename?: 'Mutation', authenticateWithAccessToken: { __typename?: 'User', id: string, name: string, email: string, profilePicture?: string | null, createdAt: any, updatedAt: any } };

export type AuthenticateWithCodeMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type AuthenticateWithCodeMutation = { __typename?: 'Mutation', authenticateWithCode: { __typename?: 'AuthResult', refreshToken: string, accessToken: string, user: { __typename?: 'User', id: string, name: string, email: string, profilePicture?: string | null, createdAt: any, updatedAt: any } } };

export type AuthenticateWithRefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type AuthenticateWithRefreshTokenMutation = { __typename?: 'Mutation', authenticateWithRefreshToken: { __typename?: 'AuthResult', refreshToken: string, accessToken: string, user: { __typename?: 'User', id: string, name: string, email: string, profilePicture?: string | null, createdAt: any, updatedAt: any } } };


export const AuthenticateWithAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateWithAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateWithAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AuthenticateWithAccessTokenMutation, AuthenticateWithAccessTokenMutationVariables>;
export const AuthenticateWithCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateWithCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateWithCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<AuthenticateWithCodeMutation, AuthenticateWithCodeMutationVariables>;
export const AuthenticateWithRefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateWithRefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateWithRefreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<AuthenticateWithRefreshTokenMutation, AuthenticateWithRefreshTokenMutationVariables>;