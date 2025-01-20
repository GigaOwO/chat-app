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
export const onCreateProfiles = /* GraphQL */ `subscription OnCreateProfiles(
  $profileId: String
  $userId: String
  $isActive: Boolean
  $name: String
  $avatarKey: String
) {
  onCreateProfiles(
    profileId: $profileId
    userId: $userId
    isActive: $isActive
    name: $name
    avatarKey: $avatarKey
  ) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProfilesSubscriptionVariables,
  APITypes.OnCreateProfilesSubscription
>;
export const onUpdateProfiles = /* GraphQL */ `subscription OnUpdateProfiles(
  $profileId: String
  $userId: String
  $isActive: Boolean
  $name: String
  $avatarKey: String
) {
  onUpdateProfiles(
    profileId: $profileId
    userId: $userId
    isActive: $isActive
    name: $name
    avatarKey: $avatarKey
  ) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProfilesSubscriptionVariables,
  APITypes.OnUpdateProfilesSubscription
>;
export const onDeleteProfiles = /* GraphQL */ `subscription OnDeleteProfiles(
  $profileId: String
  $userId: String
  $isActive: Boolean
  $name: String
  $avatarKey: String
) {
  onDeleteProfiles(
    profileId: $profileId
    userId: $userId
    isActive: $isActive
    name: $name
    avatarKey: $avatarKey
  ) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProfilesSubscriptionVariables,
  APITypes.OnDeleteProfilesSubscription
>;
export const onCreateConversations = /* GraphQL */ `subscription OnCreateConversations(
  $conversationId: ID
  $type: String
  $name: String
  $lastMessageAt: AWSDateTime
  $createdAt: AWSDateTime
) {
  onCreateConversations(
    conversationId: $conversationId
    type: $type
    name: $name
    lastMessageAt: $lastMessageAt
    createdAt: $createdAt
  ) {
    conversationId
    type
    name
    lastMessageAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateConversationsSubscriptionVariables,
  APITypes.OnCreateConversationsSubscription
>;
export const onUpdateConversations = /* GraphQL */ `subscription OnUpdateConversations(
  $conversationId: ID
  $type: String
  $name: String
  $lastMessageAt: AWSDateTime
  $createdAt: AWSDateTime
) {
  onUpdateConversations(
    conversationId: $conversationId
    type: $type
    name: $name
    lastMessageAt: $lastMessageAt
    createdAt: $createdAt
  ) {
    conversationId
    type
    name
    lastMessageAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateConversationsSubscriptionVariables,
  APITypes.OnUpdateConversationsSubscription
>;
export const onDeleteConversations = /* GraphQL */ `subscription OnDeleteConversations(
  $conversationId: ID
  $type: String
  $name: String
  $lastMessageAt: AWSDateTime
  $createdAt: AWSDateTime
) {
  onDeleteConversations(
    conversationId: $conversationId
    type: $type
    name: $name
    lastMessageAt: $lastMessageAt
    createdAt: $createdAt
  ) {
    conversationId
    type
    name
    lastMessageAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteConversationsSubscriptionVariables,
  APITypes.OnDeleteConversationsSubscription
>;
export const onCreateConversationParticipants = /* GraphQL */ `subscription OnCreateConversationParticipants(
  $conversationId: ID
  $userId: ID
  $lastReadAt: AWSDateTime
  $createdAt: AWSDateTime
) {
  onCreateConversationParticipants(
    conversationId: $conversationId
    userId: $userId
    lastReadAt: $lastReadAt
    createdAt: $createdAt
  ) {
    conversationId
    userId
    lastReadAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateConversationParticipantsSubscriptionVariables,
  APITypes.OnCreateConversationParticipantsSubscription
>;
export const onUpdateConversationParticipants = /* GraphQL */ `subscription OnUpdateConversationParticipants(
  $conversationId: ID
  $userId: ID
  $lastReadAt: AWSDateTime
  $createdAt: AWSDateTime
) {
  onUpdateConversationParticipants(
    conversationId: $conversationId
    userId: $userId
    lastReadAt: $lastReadAt
    createdAt: $createdAt
  ) {
    conversationId
    userId
    lastReadAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateConversationParticipantsSubscriptionVariables,
  APITypes.OnUpdateConversationParticipantsSubscription
>;
export const onDeleteConversationParticipants = /* GraphQL */ `subscription OnDeleteConversationParticipants(
  $conversationId: ID
  $userId: ID
  $lastReadAt: AWSDateTime
  $createdAt: AWSDateTime
) {
  onDeleteConversationParticipants(
    conversationId: $conversationId
    userId: $userId
    lastReadAt: $lastReadAt
    createdAt: $createdAt
  ) {
    conversationId
    userId
    lastReadAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteConversationParticipantsSubscriptionVariables,
  APITypes.OnDeleteConversationParticipantsSubscription
>;
export const onCreateMessages = /* GraphQL */ `subscription OnCreateMessages(
  $messageId: ID
  $conversationId: ID
  $senderId: ID
  $content: String
  $type: String
) {
  onCreateMessages(
    messageId: $messageId
    conversationId: $conversationId
    senderId: $senderId
    content: $content
    type: $type
  ) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMessagesSubscriptionVariables,
  APITypes.OnCreateMessagesSubscription
>;
export const onUpdateMessages = /* GraphQL */ `subscription OnUpdateMessages(
  $messageId: ID
  $conversationId: ID
  $senderId: ID
  $content: String
  $type: String
) {
  onUpdateMessages(
    messageId: $messageId
    conversationId: $conversationId
    senderId: $senderId
    content: $content
    type: $type
  ) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMessagesSubscriptionVariables,
  APITypes.OnUpdateMessagesSubscription
>;
export const onDeleteMessages = /* GraphQL */ `subscription OnDeleteMessages(
  $messageId: ID
  $conversationId: ID
  $senderId: ID
  $content: String
  $type: String
) {
  onDeleteMessages(
    messageId: $messageId
    conversationId: $conversationId
    senderId: $senderId
    content: $content
    type: $type
  ) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMessagesSubscriptionVariables,
  APITypes.OnDeleteMessagesSubscription
>;
