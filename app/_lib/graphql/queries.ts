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
    status
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
      status
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
  APITypes.QueryUsersByEmailIndexQueryVariables,
  APITypes.QueryUsersByEmailIndexQuery
>;
export const getProfiles = /* GraphQL */ `query GetProfiles($userId: String!, $profileId: String!) {
  getProfiles(userId: $userId, profileId: $profileId) {
    userId
    profileId
    name
    avatarKey
    bio
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
      userId
      profileId
      name
      avatarKey
      bio
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
export const queryProfilesByUserIdOrderIndex = /* GraphQL */ `query QueryProfilesByUserIdOrderIndex(
  $userId: String!
  $first: Int
  $after: String
) {
  queryProfilesByUserIdOrderIndex(
    userId: $userId
    first: $first
    after: $after
  ) {
    items {
      userId
      profileId
      name
      avatarKey
      bio
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
  APITypes.QueryProfilesByUserIdOrderIndexQueryVariables,
  APITypes.QueryProfilesByUserIdOrderIndexQuery
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
      userId
      profileId
      name
      avatarKey
      bio
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
export const getConversations = /* GraphQL */ `query GetConversations($conversationId: String!) {
  getConversations(conversationId: $conversationId) {
    conversationId
    type
    name
    lastMessageAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetConversationsQueryVariables,
  APITypes.GetConversationsQuery
>;
export const listConversations = /* GraphQL */ `query ListConversations(
  $filter: TableConversationsFilterInput
  $limit: Int
  $nextToken: String
) {
  listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      conversationId
      type
      name
      lastMessageAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConversationsQueryVariables,
  APITypes.ListConversationsQuery
>;
export const getFriends = /* GraphQL */ `query GetFriends($userId: String!, $friendId: String!) {
  getFriends(userId: $userId, friendId: $friendId) {
    userId
    friendId
    status
    userProfileId
    friendProfileId
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
      userId
      friendId
      status
      userProfileId
      friendProfileId
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
export const queryFriendsByFriendProfileIdIndex = /* GraphQL */ `query QueryFriendsByFriendProfileIdIndex(
  $friendProfileId: String!
  $first: Int
  $after: String
) {
  queryFriendsByFriendProfileIdIndex(
    friendProfileId: $friendProfileId
    first: $first
    after: $after
  ) {
    items {
      userId
      friendId
      status
      userProfileId
      friendProfileId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QueryFriendsByFriendProfileIdIndexQueryVariables,
  APITypes.QueryFriendsByFriendProfileIdIndexQuery
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
      userId
      friendId
      status
      userProfileId
      friendProfileId
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
export const queryFriendsByUserProfileIdIndex = /* GraphQL */ `query QueryFriendsByUserProfileIdIndex(
  $userProfileId: String!
  $first: Int
  $after: String
) {
  queryFriendsByUserProfileIdIndex(
    userProfileId: $userProfileId
    first: $first
    after: $after
  ) {
    items {
      userId
      friendId
      status
      userProfileId
      friendProfileId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QueryFriendsByUserProfileIdIndexQueryVariables,
  APITypes.QueryFriendsByUserProfileIdIndexQuery
>;
export const getFriendRequests = /* GraphQL */ `query GetFriendRequests($requestId: String!) {
  getFriendRequests(requestId: $requestId) {
    requestId
    receiverId
    senderId
    senderProfileId
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
      senderProfileId
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
      senderProfileId
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
      senderProfileId
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
export const queryFriendRequestsBySenderProfileIdIndex = /* GraphQL */ `query QueryFriendRequestsBySenderProfileIdIndex(
  $senderProfileId: String!
  $first: Int
  $after: String
) {
  queryFriendRequestsBySenderProfileIdIndex(
    senderProfileId: $senderProfileId
    first: $first
    after: $after
  ) {
    items {
      requestId
      receiverId
      senderId
      senderProfileId
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
  APITypes.QueryFriendRequestsBySenderProfileIdIndexQueryVariables,
  APITypes.QueryFriendRequestsBySenderProfileIdIndexQuery
>;
export const getConversationParticipants = /* GraphQL */ `query GetConversationParticipants($conversationId: String!, $userId: String!) {
  getConversationParticipants(
    conversationId: $conversationId
    userId: $userId
  ) {
    conversationId
    userId
    lastReadAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetConversationParticipantsQueryVariables,
  APITypes.GetConversationParticipantsQuery
>;
export const listConversationParticipants = /* GraphQL */ `query ListConversationParticipants(
  $filter: TableConversationParticipantsFilterInput
  $limit: Int
  $nextToken: String
) {
  listConversationParticipants(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      conversationId
      userId
      lastReadAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConversationParticipantsQueryVariables,
  APITypes.ListConversationParticipantsQuery
>;
export const queryConversationParticipantsByUserIdCreatedAtIndex = /* GraphQL */ `query QueryConversationParticipantsByUserIdCreatedAtIndex(
  $userId: String!
  $first: Int
  $after: String
) {
  queryConversationParticipantsByUserIdCreatedAtIndex(
    userId: $userId
    first: $first
    after: $after
  ) {
    items {
      conversationId
      userId
      lastReadAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QueryConversationParticipantsByUserIdCreatedAtIndexQueryVariables,
  APITypes.QueryConversationParticipantsByUserIdCreatedAtIndexQuery
>;
export const getMessages = /* GraphQL */ `query GetMessages($messageId: String!) {
  getMessages(messageId: $messageId) {
    messageId
    conversationId
    senderId
    content
    type
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMessagesQueryVariables,
  APITypes.GetMessagesQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $filter: TableMessagesFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      messageId
      conversationId
      senderId
      content
      type
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
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
export const queryMessagesByConversationIdCreatedAtIndex = /* GraphQL */ `query QueryMessagesByConversationIdCreatedAtIndex(
  $conversationId: String!
  $first: Int
  $after: String
) {
  queryMessagesByConversationIdCreatedAtIndex(
    conversationId: $conversationId
    first: $first
    after: $after
  ) {
    items {
      messageId
      conversationId
      senderId
      content
      type
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
  APITypes.QueryMessagesByConversationIdCreatedAtIndexQueryVariables,
  APITypes.QueryMessagesByConversationIdCreatedAtIndexQuery
>;
export const queryMessagesBySenderIdCreatedAtIndex = /* GraphQL */ `query QueryMessagesBySenderIdCreatedAtIndex(
  $senderId: String!
  $first: Int
  $after: String
) {
  queryMessagesBySenderIdCreatedAtIndex(
    senderId: $senderId
    first: $first
    after: $after
  ) {
    items {
      messageId
      conversationId
      senderId
      content
      type
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
  APITypes.QueryMessagesBySenderIdCreatedAtIndexQueryVariables,
  APITypes.QueryMessagesBySenderIdCreatedAtIndexQuery
>;
