import { gql } from 'graphql-request';

export const createUser = gql`
  mutation createUser {
    createUsers(input: {createdAt: "", email: "", sub: "", updatedAt: "", username: ""}) {
      createdAt
      email
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
      receivedRequests {
        nextToken
        items {
          createdAt
          receiverId
          senderId
          requestId
          status
          updatedAt
        }
      }
      sentRequests {
        items {
          createdAt
          receiverId
          requestId
          senderId
          status
          updatedAt
        }
        nextToken
      }
      sub
      username
      updatedAt
    }
  }
`;

export const updateUser = gql`
  mutation updateUser {
    updateUsers(input: {createdAt: "", email: "", sub: "", updatedAt: "", username: ""}) {
      createdAt
      email
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
      receivedRequests {
        nextToken
        items {
          createdAt
          requestId
          receiverId
          senderId
          status
          updatedAt
        }
      }
      sentRequests {
        items {
          createdAt
          receiverId
          requestId
          senderId
          status
          updatedAt
        }
        nextToken
      }
      sub
      updatedAt
      username
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser {
    deleteUsers(input: {username: ""}) {
      email
      createdAt
      friends {
        nextToken
        items {
          createdAt
          friendId
          status
          updatedAt
          userId
        }
      }
      receivedRequests {
        nextToken
        items {
          createdAt
          receiverId
          requestId
          senderId
          status
          updatedAt
        }
      }
      sentRequests {
        nextToken
        items {
          createdAt
          requestId
          receiverId
          senderId
          status
          updatedAt
        }
      }
      sub
      updatedAt
      username
    }
  }
  deleteFriends(input: {userId: "", friendId: ""}) {
    createdAt
    friendId
    status
    updatedAt
    userId
  }
  deleteProfiles(input: {profileId: "", userId: ""}) {
    avatarKey
    createdAt
    isActive
    bio
    customData
    name
    order
    profileId
    status
    updatedAt
    userId
  }
  deleteFriendRequests(input: {requestId: ""}) {
    createdAt
    receiverId
    requestId
    senderId
    status
    updatedAt
  }
`;

export const getUsers = gql`
  query getUsers {
    getUsers(username: "") {
      createdAt
      email
      friends {
        nextToken
        items {
          createdAt
          friendId
          status
          updatedAt
          userId
        }
      }
      receivedRequests {
        nextToken
        items {
          createdAt
          receiverId
          requestId
          senderId
          status
          updatedAt
        }
      }
      sentRequests {
        nextToken
        items {
          createdAt
          updatedAt
          status
          requestId
          senderId
          receiverId
        }
      }
      sub
      updatedAt
      username
    }
  }
`;