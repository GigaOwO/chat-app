import { gql } from 'graphql-request';

export const createProfile = gql`
  mutation createProfile {
    createProfiles(input: {userId: "", updatedAt: "", profileId: "", status: ONLINE, order: 1, name: "", isActive: false, customData: "", createdAt: "", bio: "", avatarKey: ""}) {
      userId
      updatedAt
      status
      profileId
      name
      order
      isActive
      customData
      createdAt
      bio
      avatarKey
    }
  }
`;

export const updateProfile = gql`
  mutation updateProfile {
    updateProfiles(input: {bio: "", avatarKey: "", createdAt: "", customData: "", isActive: false, name: "", order: 10, profileId: "", status: ONLINE, updatedAt: "", userId: ""}) {
      avatarKey
      bio
      createdAt
      customData
      isActive
      name
      order
      profileId
      status
      updatedAt
      userId
    }
  }
`;

export const deleteProfile = gql`
  mutation deleteProfile {
    deleteProfiles(input: {profileId: "", userId: ""}) {
      avatarKey
      bio
      createdAt
      customData
      isActive
      name
      order
      profileId
      status
      updatedAt
      userId
    }
    deleteFriends(input: {friendId: "", userId: ""}) {
      createdAt
      friendId
      status
      updatedAt
      userId
    }
    deleteFriendRequests(input: {requestId: ""}) {
      createdAt
      receiverId
      requestId
      senderId
      updatedAt
      status
    }
  }
`;

export const getProfile = gql`
  query getProfile {
    getUsers(username: "") {
      createdAt
      friends {
        items {
          createdAt
          friendId
          status
          updatedAt
          userId
        }
        nextToken
      }
      email
      receivedRequests {
        items {
          createdAt
          requestId
          receiverId
          updatedAt
          senderId
          status
        }
        nextToken
      }
      sentRequests {
        items {
          createdAt
          receiverId
          requestId
          status
          senderId
          updatedAt
        }
        nextToken
      }
      updatedAt
      username
      sub
    }
  }
`;