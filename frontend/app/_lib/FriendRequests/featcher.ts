import { gql } from 'graphql-request';

// 友達リクエストを作成
export const createFriendRequest = gql`
  mutation createFriendRequest($input: CreateFriendRequestsInput!) {
    createFriendRequests(input: $input) {
      requestId
      receiverId
      senderId
      status
      createdAt
      updatedAt
    }
  }
`;

// 友達リクエストを承認（リクエストを削除して友達関係を作成）
export const acceptFriendRequest = gql`
  mutation acceptFriendRequest(
    $deleteInput: DeleteFriendRequestsInput!
    $createInput: CreateFriendsInput!
  ) {
    deleteFriendRequests(input: $deleteInput) {
      requestId
      receiverId
      senderId
      status
      createdAt
      updatedAt
    }
    createFriends(input: $createInput) {
      friendId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;

// 友達リクエストを拒否
export const rejectFriendRequest = gql`
  mutation rejectFriendRequest($input: DeleteFriendRequestsInput!) {
    deleteFriendRequests(input: $input) {
      requestId
      receiverId
      senderId
      status
      createdAt
      updatedAt
    }
  }
`;

// 受信した友達リクエスト一覧を取得
export const getReceivedFriendRequests = gql`
  query getReceivedFriendRequests(
    $receiverId: String!
    $first: Int
    $after: String
  ) {
    queryFriendRequestsByReceiverIdIndex(
      receiverId: $receiverId
      first: $first
      after: $after
    ) {
      items {
        requestId
        receiverId
        senderId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;