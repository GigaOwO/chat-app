/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateProfiles = /* GraphQL */ `subscription OnCreateProfiles(
  $userId: String
  $profileId: String
  $name: String
  $avatarKey: String
  $bio: String
) {
  onCreateProfiles(
    userId: $userId
    profileId: $profileId
    name: $name
    avatarKey: $avatarKey
    bio: $bio
  ) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProfilesSubscriptionVariables,
  APITypes.OnCreateProfilesSubscription
>;
export const onUpdateProfiles = /* GraphQL */ `subscription OnUpdateProfiles(
  $userId: String
  $profileId: String
  $name: String
  $avatarKey: String
  $bio: String
) {
  onUpdateProfiles(
    userId: $userId
    profileId: $profileId
    name: $name
    avatarKey: $avatarKey
    bio: $bio
  ) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProfilesSubscriptionVariables,
  APITypes.OnUpdateProfilesSubscription
>;
export const onDeleteProfiles = /* GraphQL */ `subscription OnDeleteProfiles(
  $userId: String
  $profileId: String
  $name: String
  $avatarKey: String
  $bio: String
) {
  onDeleteProfiles(
    userId: $userId
    profileId: $profileId
    name: $name
    avatarKey: $avatarKey
    bio: $bio
  ) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProfilesSubscriptionVariables,
  APITypes.OnDeleteProfilesSubscription
>;
export const onCreateConversations = /* GraphQL */ `subscription OnCreateConversations(
  $conversationId: String
  $type: ConversationType
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
  $conversationId: String
  $type: ConversationType
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
  $conversationId: String
  $type: ConversationType
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
export const onCreateFriends = /* GraphQL */ `subscription OnCreateFriends(
  $userId: String
  $friendId: String
  $status: FriendStatus
  $userProfileId: String
  $friendProfileId: String
) {
  onCreateFriends(
    userId: $userId
    friendId: $friendId
    status: $status
    userProfileId: $userProfileId
    friendProfileId: $friendProfileId
  ) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFriendsSubscriptionVariables,
  APITypes.OnCreateFriendsSubscription
>;
export const onUpdateFriends = /* GraphQL */ `subscription OnUpdateFriends(
  $userId: String
  $friendId: String
  $status: FriendStatus
  $userProfileId: String
  $friendProfileId: String
) {
  onUpdateFriends(
    userId: $userId
    friendId: $friendId
    status: $status
    userProfileId: $userProfileId
    friendProfileId: $friendProfileId
  ) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFriendsSubscriptionVariables,
  APITypes.OnUpdateFriendsSubscription
>;
export const onDeleteFriends = /* GraphQL */ `subscription OnDeleteFriends(
  $userId: String
  $friendId: String
  $status: FriendStatus
  $userProfileId: String
  $friendProfileId: String
) {
  onDeleteFriends(
    userId: $userId
    friendId: $friendId
    status: $status
    userProfileId: $userProfileId
    friendProfileId: $friendProfileId
  ) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFriendsSubscriptionVariables,
  APITypes.OnDeleteFriendsSubscription
>;
export const onCreateFriendRequests = /* GraphQL */ `subscription OnCreateFriendRequests(
  $requestId: String
  $receiverId: String
  $senderId: String
  $senderProfileId: String
  $status: FriendRequestStatus
) {
  onCreateFriendRequests(
    requestId: $requestId
    receiverId: $receiverId
    senderId: $senderId
    senderProfileId: $senderProfileId
    status: $status
  ) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFriendRequestsSubscriptionVariables,
  APITypes.OnCreateFriendRequestsSubscription
>;
export const onUpdateFriendRequests = /* GraphQL */ `subscription OnUpdateFriendRequests(
  $requestId: String
  $receiverId: String
  $senderId: String
  $senderProfileId: String
  $status: FriendRequestStatus
) {
  onUpdateFriendRequests(
    requestId: $requestId
    receiverId: $receiverId
    senderId: $senderId
    senderProfileId: $senderProfileId
    status: $status
  ) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFriendRequestsSubscriptionVariables,
  APITypes.OnUpdateFriendRequestsSubscription
>;
export const onDeleteFriendRequests = /* GraphQL */ `subscription OnDeleteFriendRequests(
  $requestId: String
  $receiverId: String
  $senderId: String
  $senderProfileId: String
  $status: FriendRequestStatus
) {
  onDeleteFriendRequests(
    requestId: $requestId
    receiverId: $receiverId
    senderId: $senderId
    senderProfileId: $senderProfileId
    status: $status
  ) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFriendRequestsSubscriptionVariables,
  APITypes.OnDeleteFriendRequestsSubscription
>;
export const onCreateConversationParticipants = /* GraphQL */ `subscription OnCreateConversationParticipants(
  $conversationId: String
  $userId: String
  $lastReadAt: AWSDateTime
  $createdAt: AWSDateTime
  $updatedAt: AWSDateTime
) {
  onCreateConversationParticipants(
    conversationId: $conversationId
    userId: $userId
    lastReadAt: $lastReadAt
    createdAt: $createdAt
    updatedAt: $updatedAt
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
  $conversationId: String
  $userId: String
  $lastReadAt: AWSDateTime
  $createdAt: AWSDateTime
  $updatedAt: AWSDateTime
) {
  onUpdateConversationParticipants(
    conversationId: $conversationId
    userId: $userId
    lastReadAt: $lastReadAt
    createdAt: $createdAt
    updatedAt: $updatedAt
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
  $conversationId: String
  $userId: String
  $lastReadAt: AWSDateTime
  $createdAt: AWSDateTime
  $updatedAt: AWSDateTime
) {
  onDeleteConversationParticipants(
    conversationId: $conversationId
    userId: $userId
    lastReadAt: $lastReadAt
    createdAt: $createdAt
    updatedAt: $updatedAt
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
  $messageId: String
  $conversationId: String
  $senderId: String
  $content: String
  $type: MessageType
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
  $messageId: String
  $conversationId: String
  $senderId: String
  $content: String
  $type: MessageType
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
  $messageId: String
  $conversationId: String
  $senderId: String
  $content: String
  $type: MessageType
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
export const onCreateUsers = /* GraphQL */ `subscription OnCreateUsers(
  $sub: String
  $email: String
  $username: String
  $status: UserStatus
  $createdAt: AWSDateTime
) {
  onCreateUsers(
    sub: $sub
    email: $email
    username: $username
    status: $status
    createdAt: $createdAt
  ) {
    sub
    email
    username
    status
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
  $sub: String
  $email: String
  $username: String
  $status: UserStatus
  $createdAt: AWSDateTime
) {
  onUpdateUsers(
    sub: $sub
    email: $email
    username: $username
    status: $status
    createdAt: $createdAt
  ) {
    sub
    email
    username
    status
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
  $sub: String
  $email: String
  $username: String
  $status: UserStatus
  $createdAt: AWSDateTime
) {
  onDeleteUsers(
    sub: $sub
    email: $email
    username: $username
    status: $status
    createdAt: $createdAt
  ) {
    sub
    email
    username
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUsersSubscriptionVariables,
  APITypes.OnDeleteUsersSubscription
>;
