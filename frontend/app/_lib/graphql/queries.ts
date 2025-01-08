/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUsers = /* GraphQL */ `query GetUsers($username: String!) {
  getUsers(username: $username) {
    username
    email
    sub
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUsersQueryVariables, APITypes.GetUsersQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: TableUsersFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      username
      email
      sub
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const queryUsersByEmailIndex = /* GraphQL */ `query QueryUsersByEmailIndex($email: String!, $first: Int, $after: String) {
  queryUsersByEmailIndex(email: $email, first: $first, after: $after) {
    items {
      username
      email
      sub
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QueryUsersByEmailIndexQueryVariables,
  APITypes.QueryUsersByEmailIndexQuery
>;
