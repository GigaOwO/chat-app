/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateFriends = /* GraphQL */ `subscription OnCreateFriends(
  $friendId: String
  $userId: String
  $status: String
  $createdAt: AWSDateTime
  $updatedAt: AWSDateTime
) {
  onCreateFriends(
    friendId: $friendId
    userId: $userId
    status: $status
    createdAt: $createdAt
    updatedAt: $updatedAt
  ) {
    friendId
    userId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFriendsSubscriptionVariables,
  APITypes.OnCreateFriendsSubscription
>;
export const onUpdateFriends = /* GraphQL */ `subscription OnUpdateFriends(
  $friendId: String
  $userId: String
  $status: String
  $createdAt: AWSDateTime
  $updatedAt: AWSDateTime
) {
  onUpdateFriends(
    friendId: $friendId
    userId: $userId
    status: $status
    createdAt: $createdAt
    updatedAt: $updatedAt
  ) {
    friendId
    userId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFriendsSubscriptionVariables,
  APITypes.OnUpdateFriendsSubscription
>;
export const onDeleteFriends = /* GraphQL */ `subscription OnDeleteFriends(
  $friendId: String
  $userId: String
  $status: String
  $createdAt: AWSDateTime
  $updatedAt: AWSDateTime
) {
  onDeleteFriends(
    friendId: $friendId
    userId: $userId
    status: $status
    createdAt: $createdAt
    updatedAt: $updatedAt
  ) {
    friendId
    userId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFriendsSubscriptionVariables,
  APITypes.OnDeleteFriendsSubscription
>;
export const onCreateFriendRequests = /* GraphQL */ `subscription OnCreateFriendRequests(
  $requestId: String
  $receiverId: String
  $senderId: String
  $status: String
  $createdAt: AWSDateTime
) {
  onCreateFriendRequests(
    requestId: $requestId
    receiverId: $receiverId
    senderId: $senderId
    status: $status
    createdAt: $createdAt
  ) {
    requestId
    receiverId
    senderId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFriendRequestsSubscriptionVariables,
  APITypes.OnCreateFriendRequestsSubscription
>;
export const onUpdateFriendRequests = /* GraphQL */ `subscription OnUpdateFriendRequests(
  $requestId: String
  $receiverId: String
  $senderId: String
  $status: String
  $createdAt: AWSDateTime
) {
  onUpdateFriendRequests(
    requestId: $requestId
    receiverId: $receiverId
    senderId: $senderId
    status: $status
    createdAt: $createdAt
  ) {
    requestId
    receiverId
    senderId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFriendRequestsSubscriptionVariables,
  APITypes.OnUpdateFriendRequestsSubscription
>;
export const onDeleteFriendRequests = /* GraphQL */ `subscription OnDeleteFriendRequests(
  $requestId: String
  $receiverId: String
  $senderId: String
  $status: String
  $createdAt: AWSDateTime
) {
  onDeleteFriendRequests(
    requestId: $requestId
    receiverId: $receiverId
    senderId: $senderId
    status: $status
    createdAt: $createdAt
  ) {
    requestId
    receiverId
    senderId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFriendRequestsSubscriptionVariables,
  APITypes.OnDeleteFriendRequestsSubscription
>;
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
    sentRequests {
      nextToken
      __typename
    }
    receivedRequests {
      nextToken
      __typename
    }
    friends {
      nextToken
      __typename
    }
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
    sentRequests {
      nextToken
      __typename
    }
    receivedRequests {
      nextToken
      __typename
    }
    friends {
      nextToken
      __typename
    }
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
    sentRequests {
      nextToken
      __typename
    }
    receivedRequests {
      nextToken
      __typename
    }
    friends {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUsersSubscriptionVariables,
  APITypes.OnDeleteUsersSubscription
>;
