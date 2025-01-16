import { gql } from 'graphql-request';

export const createFriendRequest = gql`
  mutation createFriendRequest {
    createFriendRequests(input: {createdAt: "", receiverId: "", requestId: "", senderId: "", status: PENDING, updatedAt: ""}) {
      createdAt
      requestId
      receiverId
      status
      updatedAt
      senderId
    }
  }
`;

export const acceptFriendRequest = gql`
  mutation acceptFriendRequest {
    deleteFriendRequests(input: {requestId: ""}) {
      updatedAt
      createdAt
      receiverId
      senderId
      requestId
      status
    }
    createFriends(input: {createdAt: "", friendId: "", status: ACTIVE, updatedAt: "", userId: ""}) {
      createdAt
      friendId
      status
      updatedAt
      userId
    }
  }
`;

export const rejectFriendRequest = gql`
  mutation rejectFriendRequest {
    deleteFriendRequests(input: {requestId: ""}) {
      updatedAt
      createdAt
      receiverId
      senderId
      requestId
      status
    }
  }
`;

export const getFriendRequests = gql`
  query getFriendRequests {
    getFriendRequests(requestId: "") {
      createdAt
      receiverId
      requestId
      senderId
      status
      updatedAt
    }
  }
`;