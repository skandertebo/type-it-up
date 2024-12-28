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
};

export type HelloWorldSchema = {
  __typename?: 'HelloWorldSchema';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticate: Scalars['String']['output'];
};


export type MutationAuthenticateArgs = {
  code: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getSSOUrl: Scalars['String']['output'];
  sayHello: HelloWorldSchema;
};


export type QueryGetSsoUrlArgs = {
  organizationId: Scalars['String']['input'];
};

export type GetSsoUrlQueryVariables = Exact<{
  organizationId: Scalars['String']['input'];
}>;


export type GetSsoUrlQuery = { __typename?: 'Query', getSSOUrl: string };


export const GetSsoUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSSOUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSSOUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}]}]}}]} as unknown as DocumentNode<GetSsoUrlQuery, GetSsoUrlQueryVariables>;