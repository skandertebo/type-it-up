/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation AuthenticateWithAccessToken {\n    authenticateWithAccessToken {\n      id\n      username\n      firstName\n      lastName\n      email\n      profilePicture\n      createdAt\n      updatedAt\n    }\n  }\n": types.AuthenticateWithAccessTokenDocument,
    "\n  mutation AuthenticateWithCode($code: String!) {\n    authenticateWithCode(code: $code) {\n      user {\n        id\n        username\n        firstName\n        lastName\n        email\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      refreshToken\n      accessToken\n    }\n  }\n": types.AuthenticateWithCodeDocument,
    "\n  mutation AuthenticateWithRefreshToken($refreshToken: String!) {\n    authenticateWithRefreshToken(refreshToken: $refreshToken) {\n      user {\n        id\n        username\n        firstName\n        lastName\n        email\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      refreshToken\n      accessToken\n    }\n  }\n": types.AuthenticateWithRefreshTokenDocument,
    "\n  mutation CreateGame($createGameInput: CreateGameInput!) {\n    createGame(createGameInput: $createGameInput) {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n": types.CreateGameDocument,
    "\n  mutation DeleteGame($id: String!) {\n    deleteGame(id: $id)\n  }\n": types.DeleteGameDocument,
    "\n  query GetGameHistory(\n    $since: DateTime\n    $until: DateTime\n    $difficulty: String\n    $sortOrder: SortOrder\n  ) {\n    getGameHistory(\n      since: $since\n      until: $until\n      difficulty: $difficulty\n      sortOrder: $sortOrder\n    ) {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n": types.GetGameHistoryDocument,
    "\n  query GetGame($id: String!) {\n    getGame(id: $id) {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n": types.GetGameDocument,
    "\n  query GetLeaderboard($sortType: LeaderboardSortType!) {\n    getLeaderboard(sortType: $sortType) {\n      user {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n      score\n    }\n  }\n": types.GetLeaderboardDocument,
    "\n  query GetUserGames {\n    getUserGames {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n": types.GetUserGamesDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    authenticateWithUserPassword(email: $email, password: $password) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        username\n        workosId\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Signup(\n    $email: String!\n    $password: String!\n    $firstName: String!\n    $lastName: String!\n    $username: String!\n  ) {\n    registerUser(\n      email: $email\n      password: $password\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n    ) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        username\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": types.SignupDocument,
    "\n  query CheckUsernameExists($username: String!) {\n    checkUsernameExists(username: $username)\n  }\n": types.CheckUsernameExistsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthenticateWithAccessToken {\n    authenticateWithAccessToken {\n      id\n      username\n      firstName\n      lastName\n      email\n      profilePicture\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation AuthenticateWithAccessToken {\n    authenticateWithAccessToken {\n      id\n      username\n      firstName\n      lastName\n      email\n      profilePicture\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthenticateWithCode($code: String!) {\n    authenticateWithCode(code: $code) {\n      user {\n        id\n        username\n        firstName\n        lastName\n        email\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      refreshToken\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation AuthenticateWithCode($code: String!) {\n    authenticateWithCode(code: $code) {\n      user {\n        id\n        username\n        firstName\n        lastName\n        email\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      refreshToken\n      accessToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthenticateWithRefreshToken($refreshToken: String!) {\n    authenticateWithRefreshToken(refreshToken: $refreshToken) {\n      user {\n        id\n        username\n        firstName\n        lastName\n        email\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      refreshToken\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation AuthenticateWithRefreshToken($refreshToken: String!) {\n    authenticateWithRefreshToken(refreshToken: $refreshToken) {\n      user {\n        id\n        username\n        firstName\n        lastName\n        email\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      refreshToken\n      accessToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateGame($createGameInput: CreateGameInput!) {\n    createGame(createGameInput: $createGameInput) {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGame($createGameInput: CreateGameInput!) {\n    createGame(createGameInput: $createGameInput) {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteGame($id: String!) {\n    deleteGame(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteGame($id: String!) {\n    deleteGame(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGameHistory(\n    $since: DateTime\n    $until: DateTime\n    $difficulty: String\n    $sortOrder: SortOrder\n  ) {\n    getGameHistory(\n      since: $since\n      until: $until\n      difficulty: $difficulty\n      sortOrder: $sortOrder\n    ) {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetGameHistory(\n    $since: DateTime\n    $until: DateTime\n    $difficulty: String\n    $sortOrder: SortOrder\n  ) {\n    getGameHistory(\n      since: $since\n      until: $until\n      difficulty: $difficulty\n      sortOrder: $sortOrder\n    ) {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGame($id: String!) {\n    getGame(id: $id) {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetGame($id: String!) {\n    getGame(id: $id) {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetLeaderboard($sortType: LeaderboardSortType!) {\n    getLeaderboard(sortType: $sortType) {\n      user {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n      score\n    }\n  }\n"): (typeof documents)["\n  query GetLeaderboard($sortType: LeaderboardSortType!) {\n    getLeaderboard(sortType: $sortType) {\n      user {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n      score\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserGames {\n    getUserGames {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserGames {\n    getUserGames {\n      id\n      options {\n        difficulty\n        punctuation\n        numbers\n      }\n      gameContent\n      userContent\n      duration\n      wpm\n      accuracy\n      score\n      createdAt\n      users {\n        id\n        username\n        firstName\n        lastName\n        workosId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    authenticateWithUserPassword(email: $email, password: $password) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        username\n        workosId\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    authenticateWithUserPassword(email: $email, password: $password) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        username\n        workosId\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Signup(\n    $email: String!\n    $password: String!\n    $firstName: String!\n    $lastName: String!\n    $username: String!\n  ) {\n    registerUser(\n      email: $email\n      password: $password\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n    ) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        username\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Signup(\n    $email: String!\n    $password: String!\n    $firstName: String!\n    $lastName: String!\n    $username: String!\n  ) {\n    registerUser(\n      email: $email\n      password: $password\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n    ) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        username\n        profilePicture\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CheckUsernameExists($username: String!) {\n    checkUsernameExists(username: $username)\n  }\n"): (typeof documents)["\n  query CheckUsernameExists($username: String!) {\n    checkUsernameExists(username: $username)\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;