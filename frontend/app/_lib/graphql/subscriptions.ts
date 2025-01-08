/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUsers = /* GraphQL */ `subscription OnCreateUsers(
  $username: String
  $email: String
  $sub: String
  $createdAt: AWSDateTime
  $updatedAt: AWSDateTime
) {
  onCreateUsers(
    username: $username
    email: $email
    sub: $sub
    createdAt: $createdAt
    updatedAt: $updatedAt
  ) {
    username
    email
    sub
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUsersSubscriptionVariables,
  APITypes.OnCreateUsersSubscription
>;
export const onUpdateUsers = /* GraphQL */ `subscription OnUpdateUsers(
  $username: String
  $email: String
  $sub: String
  $createdAt: AWSDateTime
  $updatedAt: AWSDateTime
) {
  onUpdateUsers(
    username: $username
    email: $email
    sub: $sub
    createdAt: $createdAt
    updatedAt: $updatedAt
  ) {
    username
    email
    sub
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUsersSubscriptionVariables,
  APITypes.OnUpdateUsersSubscription
>;
export const onDeleteUsers = /* GraphQL */ `subscription OnDeleteUsers(
  $username: String
  $email: String
  $sub: String
  $createdAt: AWSDateTime
  $updatedAt: AWSDateTime
) {
  onDeleteUsers(
    username: $username
    email: $email
    sub: $sub
    createdAt: $createdAt
    updatedAt: $updatedAt
  ) {
    username
    email
    sub
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUsersSubscriptionVariables,
  APITypes.OnDeleteUsersSubscription
>;
