/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUsers = /* GraphQL */ `mutation CreateUsers($input: CreateUsersInput!) {
  createUsers(input: $input) {
    username
    email
    sub
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUsersMutationVariables,
  APITypes.CreateUsersMutation
>;
export const updateUsers = /* GraphQL */ `mutation UpdateUsers($input: UpdateUsersInput!) {
  updateUsers(input: $input) {
    username
    email
    sub
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUsersMutationVariables,
  APITypes.UpdateUsersMutation
>;
export const deleteUsers = /* GraphQL */ `mutation DeleteUsers($input: DeleteUsersInput!) {
  deleteUsers(input: $input) {
    username
    email
    sub
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUsersMutationVariables,
  APITypes.DeleteUsersMutation
>;
export const createProfiles = /* GraphQL */ `mutation CreateProfiles($input: CreateProfilesInput!) {
  createProfiles(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateProfilesMutationVariables,
  APITypes.CreateProfilesMutation
>;
export const updateProfiles = /* GraphQL */ `mutation UpdateProfiles($input: UpdateProfilesInput!) {
  updateProfiles(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateProfilesMutationVariables,
  APITypes.UpdateProfilesMutation
>;
export const deleteProfiles = /* GraphQL */ `mutation DeleteProfiles($input: DeleteProfilesInput!) {
  deleteProfiles(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteProfilesMutationVariables,
  APITypes.DeleteProfilesMutation
>;
export const createConversations = /* GraphQL */ `mutation CreateConversations($input: CreateConversationsInput!) {
  createConversations(input: $input) {
    conversationId
    type
    name
    lastMessageAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateConversationsMutationVariables,
  APITypes.CreateConversationsMutation
>;
export const updateConversations = /* GraphQL */ `mutation UpdateConversations($input: UpdateConversationsInput!) {
  updateConversations(input: $input) {
    conversationId
    type
    name
    lastMessageAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateConversationsMutationVariables,
  APITypes.UpdateConversationsMutation
>;
export const deleteConversations = /* GraphQL */ `mutation DeleteConversations($input: DeleteConversationsInput!) {
  deleteConversations(input: $input) {
    conversationId
    type
    name
    lastMessageAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteConversationsMutationVariables,
  APITypes.DeleteConversationsMutation
>;
export const createFriends = /* GraphQL */ `mutation CreateFriends($input: CreateFriendsInput!) {
  createFriends(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateFriendsMutationVariables,
  APITypes.CreateFriendsMutation
>;
export const updateFriends = /* GraphQL */ `mutation UpdateFriends($input: UpdateFriendsInput!) {
  updateFriends(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateFriendsMutationVariables,
  APITypes.UpdateFriendsMutation
>;
export const deleteFriends = /* GraphQL */ `mutation DeleteFriends($input: DeleteFriendsInput!) {
  deleteFriends(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteFriendsMutationVariables,
  APITypes.DeleteFriendsMutation
>;
export const createFriendRequests = /* GraphQL */ `mutation CreateFriendRequests($input: CreateFriendRequestsInput!) {
  createFriendRequests(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateFriendRequestsMutationVariables,
  APITypes.CreateFriendRequestsMutation
>;
export const updateFriendRequests = /* GraphQL */ `mutation UpdateFriendRequests($input: UpdateFriendRequestsInput!) {
  updateFriendRequests(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateFriendRequestsMutationVariables,
  APITypes.UpdateFriendRequestsMutation
>;
export const deleteFriendRequests = /* GraphQL */ `mutation DeleteFriendRequests($input: DeleteFriendRequestsInput!) {
  deleteFriendRequests(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteFriendRequestsMutationVariables,
  APITypes.DeleteFriendRequestsMutation
>;
export const createConversationParticipants = /* GraphQL */ `mutation CreateConversationParticipants(
  $input: CreateConversationParticipantsInput!
) {
  createConversationParticipants(input: $input) {
    conversationId
    userId
    lastReadAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateConversationParticipantsMutationVariables,
  APITypes.CreateConversationParticipantsMutation
>;
export const updateConversationParticipants = /* GraphQL */ `mutation UpdateConversationParticipants(
  $input: UpdateConversationParticipantsInput!
) {
  updateConversationParticipants(input: $input) {
    conversationId
    userId
    lastReadAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateConversationParticipantsMutationVariables,
  APITypes.UpdateConversationParticipantsMutation
>;
export const deleteConversationParticipants = /* GraphQL */ `mutation DeleteConversationParticipants(
  $input: DeleteConversationParticipantsInput!
) {
  deleteConversationParticipants(input: $input) {
    conversationId
    userId
    lastReadAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteConversationParticipantsMutationVariables,
  APITypes.DeleteConversationParticipantsMutation
>;
export const createMessages = /* GraphQL */ `mutation CreateMessages($input: CreateMessagesInput!) {
  createMessages(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMessagesMutationVariables,
  APITypes.CreateMessagesMutation
>;
export const updateMessages = /* GraphQL */ `mutation UpdateMessages($input: UpdateMessagesInput!) {
  updateMessages(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateMessagesMutationVariables,
  APITypes.UpdateMessagesMutation
>;
export const deleteMessages = /* GraphQL */ `mutation DeleteMessages($input: DeleteMessagesInput!) {
  deleteMessages(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteMessagesMutationVariables,
  APITypes.DeleteMessagesMutation
>;
