import { gql } from 'graphql-request';

export const createFriendRequest = gql`
  mutation createFriendRequests {
    createFriendRequests(input: {createdAt: "", requestId: "", receiverId: "", senderId: "", status: PENDING, updatedAt: ""}){ }
  }
`;

export const acceptFriendRequest = gql`
  mutation updateFriendRequests {
    updateFriendRequests(input: {requestId: "", status: ACCEPTED}) {}
  }
`;

export const deleteFriendRequest = gql`
  mutation deleteFriendRequests {
    deleteFriendRequests(input: {requestId: ""}){}
  }
`;

export const getFriendRequests = gql`
`;