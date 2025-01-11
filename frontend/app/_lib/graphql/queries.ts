/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getFriends = /* GraphQL */ `query GetFriends($userId: String!, $friendId: String!) {
  getFriends(userId: $userId, friendId: $friendId) {
    friendId
    userId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFriendsQueryVariables,
  APITypes.GetFriendsQuery
>;
export const listFriends = /* GraphQL */ `query ListFriends(
  $filter: TableFriendsFilterInput
  $limit: Int
  $nextToken: String
) {
  listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      friendId
      userId
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFriendsQueryVariables,
  APITypes.ListFriendsQuery
>;
export const queryFriendsByFriendIdIndex = /* GraphQL */ `query QueryFriendsByFriendIdIndex(
  $friendId: String!
  $first: Int
  $after: String
) {
  queryFriendsByFriendIdIndex(
    friendId: $friendId
    first: $first
    after: $after
  ) {
    items {
      friendId
      userId
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QueryFriendsByFriendIdIndexQueryVariables,
  APITypes.QueryFriendsByFriendIdIndexQuery
>;
export const getFriendRequests = /* GraphQL */ `query GetFriendRequests($requestId: String!) {
  getFriendRequests(requestId: $requestId) {
    requestId
    receiverId
    senderId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFriendRequestsQueryVariables,
  APITypes.GetFriendRequestsQuery
>;
export const listFriendRequests = /* GraphQL */ `query ListFriendRequests(
  $filter: TableFriendRequestsFilterInput
  $limit: Int
  $nextToken: String
) {
  listFriendRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      requestId
      receiverId
      senderId
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFriendRequestsQueryVariables,
  APITypes.ListFriendRequestsQuery
>;
export const queryFriendRequestsBySenderIdIndex = /* GraphQL */ `query QueryFriendRequestsBySenderIdIndex(
  $senderId: String!
  $first: Int
  $after: String
) {
  queryFriendRequestsBySenderIdIndex(
    senderId: $senderId
    first: $first
    after: $after
  ) {
    items {
      requestId
      receiverId
      senderId
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QueryFriendRequestsBySenderIdIndexQueryVariables,
  APITypes.QueryFriendRequestsBySenderIdIndexQuery
>;
export const queryFriendRequestsByReceiverIdIndex = /* GraphQL */ `query QueryFriendRequestsByReceiverIdIndex(
  $receiverId: String!
  $first: Int
  $after: String
) {
  queryFriendRequestsByReceiverIdIndex(
    receiverId: $receiverId
    first: $first
    after: $after
  ) {
    items {
      requestId
      receiverId
      senderId
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QueryFriendRequestsByReceiverIdIndexQueryVariables,
  APITypes.QueryFriendRequestsByReceiverIdIndexQuery
>;
export const getUsers = /* GraphQL */ `query GetUsers($username: String!) {
  getUsers(username: $username) {
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
export const getProfiles = /* GraphQL */ `query GetProfiles($userId: String!, $profileId: String!) {
  getProfiles(userId: $userId, profileId: $profileId) {
    profileId
    userId
    isActive
    name
    avatarKey
    bio
    status
    order
    customData
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProfilesQueryVariables,
  APITypes.GetProfilesQuery
>;
export const listProfiles = /* GraphQL */ `query ListProfiles(
  $filter: TableProfilesFilterInput
  $limit: Int
  $nextToken: String
) {
  listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      profileId
      userId
      isActive
      name
      avatarKey
      bio
      status
      order
      customData
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProfilesQueryVariables,
  APITypes.ListProfilesQuery
>;
export const queryProfilesByProfileIdIndex = /* GraphQL */ `query QueryProfilesByProfileIdIndex(
  $profileId: String!
  $first: Int
  $after: String
) {
  queryProfilesByProfileIdIndex(
    profileId: $profileId
    first: $first
    after: $after
  ) {
    items {
      profileId
      userId
      isActive
      name
      avatarKey
      bio
      status
      order
      customData
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QueryProfilesByProfileIdIndexQueryVariables,
  APITypes.QueryProfilesByProfileIdIndexQuery
>;
export const queryProfilesByUserIdIsActiveIndex = /* GraphQL */ `query QueryProfilesByUserIdIsActiveIndex(
  $userId: String!
  $first: Int
  $after: String
) {
  queryProfilesByUserIdIsActiveIndex(
    userId: $userId
    first: $first
    after: $after
  ) {
    items {
      profileId
      userId
      isActive
      name
      avatarKey
      bio
      status
      order
      customData
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QueryProfilesByUserIdIsActiveIndexQueryVariables,
  APITypes.QueryProfilesByUserIdIsActiveIndexQuery
>;
