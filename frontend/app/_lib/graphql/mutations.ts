/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createFriends = /* GraphQL */ `mutation CreateFriends($input: CreateFriendsInput!) {
  createFriends(input: $input) {
    friendId
    userId
    status
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
    friendId
    userId
    status
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
    friendId
    userId
    status
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
export const createUsers = /* GraphQL */ `mutation CreateUsers($input: CreateUsersInput!) {
  createUsers(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUsersMutationVariables,
  APITypes.CreateUsersMutation
>;
export const updateUsers = /* GraphQL */ `mutation UpdateUsers($input: UpdateUsersInput!) {
  updateUsers(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUsersMutationVariables,
  APITypes.UpdateUsersMutation
>;
export const deleteUsers = /* GraphQL */ `mutation DeleteUsers($input: DeleteUsersInput!) {
  deleteUsers(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUsersMutationVariables,
  APITypes.DeleteUsersMutation
>;
export const createProfiles = /* GraphQL */ `mutation CreateProfiles($input: CreateProfilesInput!) {
  createProfiles(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateProfilesMutationVariables,
  APITypes.CreateProfilesMutation
>;
export const updateProfiles = /* GraphQL */ `mutation UpdateProfiles($input: UpdateProfilesInput!) {
  updateProfiles(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateProfilesMutationVariables,
  APITypes.UpdateProfilesMutation
>;
export const deleteProfiles = /* GraphQL */ `mutation DeleteProfiles($input: DeleteProfilesInput!) {
  deleteProfiles(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteProfilesMutationVariables,
  APITypes.DeleteProfilesMutation
>;
