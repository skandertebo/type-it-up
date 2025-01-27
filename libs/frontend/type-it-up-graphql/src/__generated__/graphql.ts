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

export type CreateGameInput = {
  accuracy: Scalars['Float']['input'];
  duration: Scalars['Float']['input'];
  gameContent: Scalars['String']['input'];
  options: GameOptionsInput;
  score: Scalars['Float']['input'];
  userContent: Scalars['String']['input'];
  wpm: Scalars['Float']['input'];
};

export type DailyStats = {
  __typename?: 'DailyStats';
  averageAccuracy: Scalars['Float']['output'];
  averageWpm: Scalars['Float']['output'];
  date: Scalars['DateTime']['output'];
};

/** The difficulty of the text */
export enum Difficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

export type Game = {
  __typename?: 'Game';
  accuracy: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Float']['output'];
  gameContent: Scalars['String']['output'];
  id: Scalars['String']['output'];
  options: GameOptions;
  score: Scalars['Float']['output'];
  userContent: Scalars['String']['output'];
  users: Array<User>;
  wpm: Scalars['Float']['output'];
};

export type GameOptions = {
  __typename?: 'GameOptions';
  difficulty: Scalars['String']['output'];
  numbers: Scalars['Boolean']['output'];
  punctuation: Scalars['Boolean']['output'];
};

export type GameOptionsInput = {
  difficulty: Scalars['String']['input'];
  numbers: Scalars['Boolean']['input'];
  punctuation: Scalars['Boolean']['input'];
};

/** Field to sort games by */
export enum GameSortField {
  Date = 'DATE',
  Score = 'SCORE'
}

export type GeneratedTextData = {
  __typename?: 'GeneratedTextData';
  length: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  words: Array<Scalars['String']['output']>;
};

export type GeneratedTextResponse = {
  __typename?: 'GeneratedTextResponse';
  data: GeneratedTextData;
  success: Scalars['Boolean']['output'];
};

export type HelloWorldSchema = {
  __typename?: 'HelloWorldSchema';
  message: Scalars['String']['output'];
};

export type LeaderboardEntry = {
  __typename?: 'LeaderboardEntry';
  averageAccuracy: Scalars['Float']['output'];
  averageScore: Scalars['Float']['output'];
  averageWpm: Scalars['Float']['output'];
  bestScore: Scalars['Float']['output'];
  user: User;
};

/** Sort type for leaderboard - either by best score or average score */
export enum LeaderboardSortType {
  AverageScore = 'AVERAGE_SCORE',
  BestScore = 'BEST_SCORE'
}

export type Mutation = {
  __typename?: 'Mutation';
  authenticateWithAccessToken: User;
  authenticateWithCode: AuthResult;
  authenticateWithRefreshToken: AuthResult;
  authenticateWithUserPassword: AuthResult;
  createGame: Game;
  deleteGame: Scalars['Boolean']['output'];
  registerUser: AuthResult;
};


export type MutationAuthenticateWithCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationAuthenticateWithRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationAuthenticateWithUserPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateGameArgs = {
  createGameInput: CreateGameInput;
};


export type MutationDeleteGameArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  checkUsernameExists: Scalars['Boolean']['output'];
  generateText: GeneratedTextResponse;
  getGame: Game;
  getGameHistory: Array<Game>;
  getLeaderboard: Array<LeaderboardEntry>;
  getUserGames: Array<Game>;
  getUserStats: UserGameStats;
  sayHello: HelloWorldSchema;
};


export type QueryCheckUsernameExistsArgs = {
  username: Scalars['String']['input'];
};


export type QueryGenerateTextArgs = {
  difficulty?: Difficulty;
  numbers?: Scalars['Boolean']['input'];
  punctuation?: Scalars['Boolean']['input'];
};


export type QueryGetGameArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetGameHistoryArgs = {
  difficulty?: InputMaybe<Scalars['String']['input']>;
  since?: InputMaybe<Scalars['DateTime']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<GameSortField>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']['input']>;
  until?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetLeaderboardArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  sortOrder: SortOrder;
  sortType: LeaderboardSortType;
};

/** Sort order for query results */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  games: Array<Game>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  stats?: Maybe<UserStats>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  workosId: Scalars['String']['output'];
};

export type UserGameStats = {
  __typename?: 'UserGameStats';
  averageAccuracy: Scalars['Float']['output'];
  averageWpm: Scalars['Float']['output'];
  dailyStats: Array<DailyStats>;
  highestScore: Scalars['Float']['output'];
};

export type UserStats = {
  __typename?: 'UserStats';
  averageAccuracy: Scalars['Float']['output'];
  averageWpm: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  user: User;
};

export type AuthenticateWithAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthenticateWithAccessTokenMutation = { __typename?: 'Mutation', authenticateWithAccessToken: { __typename?: 'User', id: string, username: string, firstName?: string | null, lastName?: string | null, email: string, profilePicture?: string | null, createdAt: any, updatedAt: any } };

export type AuthenticateWithCodeMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type AuthenticateWithCodeMutation = { __typename?: 'Mutation', authenticateWithCode: { __typename?: 'AuthResult', refreshToken: string, accessToken: string, user: { __typename?: 'User', id: string, username: string, firstName?: string | null, lastName?: string | null, email: string, profilePicture?: string | null, createdAt: any, updatedAt: any } } };

export type AuthenticateWithRefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type AuthenticateWithRefreshTokenMutation = { __typename?: 'Mutation', authenticateWithRefreshToken: { __typename?: 'AuthResult', refreshToken: string, accessToken: string, user: { __typename?: 'User', id: string, username: string, firstName?: string | null, lastName?: string | null, email: string, profilePicture?: string | null, createdAt: any, updatedAt: any } } };

export type CreateGameMutationVariables = Exact<{
  createGameInput: CreateGameInput;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: string, gameContent: string, userContent: string, duration: number, wpm: number, accuracy: number, score: number, createdAt: any, options: { __typename?: 'GameOptions', difficulty: string, punctuation: boolean, numbers: boolean }, users: Array<{ __typename?: 'User', id: string, username: string, firstName?: string | null, lastName?: string | null, workosId: string }> } };

export type DeleteGameMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteGameMutation = { __typename?: 'Mutation', deleteGame: boolean };

export type GenerateTextQueryVariables = Exact<{
  difficulty?: InputMaybe<Difficulty>;
  punctuation?: InputMaybe<Scalars['Boolean']['input']>;
  numbers?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GenerateTextQuery = { __typename?: 'Query', generateText: { __typename?: 'GeneratedTextResponse', success: boolean, data: { __typename?: 'GeneratedTextData', text: string, words: Array<string>, length: number } } };

export type GetGameHistoryQueryVariables = Exact<{
  since?: InputMaybe<Scalars['DateTime']['input']>;
  until?: InputMaybe<Scalars['DateTime']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
  sortBy?: InputMaybe<GameSortField>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetGameHistoryQuery = { __typename?: 'Query', getGameHistory: Array<{ __typename?: 'Game', id: string, gameContent: string, userContent: string, duration: number, wpm: number, accuracy: number, score: number, createdAt: any, options: { __typename?: 'GameOptions', difficulty: string, punctuation: boolean, numbers: boolean }, users: Array<{ __typename?: 'User', id: string, username: string, firstName?: string | null, lastName?: string | null, workosId: string }> }> };

export type GetGameQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetGameQuery = { __typename?: 'Query', getGame: { __typename?: 'Game', id: string, gameContent: string, userContent: string, duration: number, wpm: number, accuracy: number, score: number, createdAt: any, options: { __typename?: 'GameOptions', difficulty: string, punctuation: boolean, numbers: boolean }, users: Array<{ __typename?: 'User', id: string, username: string, firstName?: string | null, lastName?: string | null, workosId: string }> } };

export type GetUserGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserGamesQuery = { __typename?: 'Query', getUserGames: Array<{ __typename?: 'Game', id: string, gameContent: string, userContent: string, duration: number, wpm: number, accuracy: number, score: number, createdAt: any, options: { __typename?: 'GameOptions', difficulty: string, punctuation: boolean, numbers: boolean }, users: Array<{ __typename?: 'User', id: string, username: string, firstName?: string | null, lastName?: string | null, workosId: string }> }> };

export type GetUserStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserStatsQuery = { __typename?: 'Query', getUserStats: { __typename?: 'UserGameStats', averageWpm: number, averageAccuracy: number, highestScore: number, dailyStats: Array<{ __typename?: 'DailyStats', date: any, averageWpm: number, averageAccuracy: number }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', authenticateWithUserPassword: { __typename?: 'AuthResult', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, username: string, workosId: string, profilePicture?: string | null, createdAt: any, updatedAt: any } } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'AuthResult', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, username: string, profilePicture?: string | null, createdAt: any, updatedAt: any } } };

export type CheckUsernameExistsQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type CheckUsernameExistsQuery = { __typename?: 'Query', checkUsernameExists: boolean };


export const AuthenticateWithAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateWithAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateWithAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AuthenticateWithAccessTokenMutation, AuthenticateWithAccessTokenMutationVariables>;
export const AuthenticateWithCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateWithCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateWithCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<AuthenticateWithCodeMutation, AuthenticateWithCodeMutationVariables>;
export const AuthenticateWithRefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateWithRefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateWithRefreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<AuthenticateWithRefreshTokenMutation, AuthenticateWithRefreshTokenMutationVariables>;
export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createGameInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createGameInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createGameInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"punctuation"}},{"kind":"Field","name":{"kind":"Name","value":"numbers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gameContent"}},{"kind":"Field","name":{"kind":"Name","value":"userContent"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"workosId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const DeleteGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteGameMutation, DeleteGameMutationVariables>;
export const GenerateTextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GenerateText"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"difficulty"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Difficulty"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"punctuation"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numbers"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateText"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"difficulty"},"value":{"kind":"Variable","name":{"kind":"Name","value":"difficulty"}}},{"kind":"Argument","name":{"kind":"Name","value":"punctuation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"punctuation"}}},{"kind":"Argument","name":{"kind":"Name","value":"numbers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numbers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"words"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]}}]} as unknown as DocumentNode<GenerateTextQuery, GenerateTextQueryVariables>;
export const GetGameHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGameHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"since"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"until"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"difficulty"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortOrder"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GameSortField"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGameHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"since"},"value":{"kind":"Variable","name":{"kind":"Name","value":"since"}}},{"kind":"Argument","name":{"kind":"Name","value":"until"},"value":{"kind":"Variable","name":{"kind":"Name","value":"until"}}},{"kind":"Argument","name":{"kind":"Name","value":"difficulty"},"value":{"kind":"Variable","name":{"kind":"Name","value":"difficulty"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"punctuation"}},{"kind":"Field","name":{"kind":"Name","value":"numbers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gameContent"}},{"kind":"Field","name":{"kind":"Name","value":"userContent"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"workosId"}}]}}]}}]}}]} as unknown as DocumentNode<GetGameHistoryQuery, GetGameHistoryQueryVariables>;
export const GetGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"punctuation"}},{"kind":"Field","name":{"kind":"Name","value":"numbers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gameContent"}},{"kind":"Field","name":{"kind":"Name","value":"userContent"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"workosId"}}]}}]}}]}}]} as unknown as DocumentNode<GetGameQuery, GetGameQueryVariables>;
export const GetUserGamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserGames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserGames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"punctuation"}},{"kind":"Field","name":{"kind":"Name","value":"numbers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gameContent"}},{"kind":"Field","name":{"kind":"Name","value":"userContent"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"wpm"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"workosId"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserGamesQuery, GetUserGamesQueryVariables>;
export const GetUserStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageWpm"}},{"kind":"Field","name":{"kind":"Name","value":"averageAccuracy"}},{"kind":"Field","name":{"kind":"Name","value":"highestScore"}},{"kind":"Field","name":{"kind":"Name","value":"dailyStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"averageWpm"}},{"kind":"Field","name":{"kind":"Name","value":"averageAccuracy"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserStatsQuery, GetUserStatsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateWithUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"workosId"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const CheckUsernameExistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckUsernameExists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkUsernameExists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<CheckUsernameExistsQuery, CheckUsernameExistsQueryVariables>;