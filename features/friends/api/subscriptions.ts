import { gql } from 'graphql-request';

export const onCreateFriendRequests = gql`
  subscription OnCreateFriendRequests {
    onCreateFriendRequests {
      requestId
      senderId
      receiverId
      status
      createdAt
      updatedAt
    }
  }
`;

export const onUpdateFriendRequests = gql`
  subscription OnUpdateFriendRequests {
    onUpdateFriendRequests {
      requestId
      senderId
      receiverId
      status
      createdAt
      updatedAt
    }
  }
`;

export const onDeleteFriendRequests = gql`
  subscription OnDeleteFriendRequests {
    onDeleteFriendRequests {
      requestId
      senderId
      receiverId
      status
      createdAt
      updatedAt
    }
  }
`;
