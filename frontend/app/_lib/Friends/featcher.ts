import { gql } from 'graphql-request';

export const getFriends = gql`
  query getFriends {
    getFriends(friendId: "", userId: "") {
      createdAt
      friendId
      status
      updatedAt
      userId
    }
  }
`;

export const deleteFriend = gql`
  mutation deleteFriend {
    deleteFriends(input: {userId: "", friendId: ""}) {
      createdAt
      friendId
      status
      updatedAt
      userId
    }
  }
`;