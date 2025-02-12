import { gql } from 'graphql-request';

// フレンドを取得
export const getFriend = gql`
  query getFriend($friendId: String!) {
    getFriend(friendId: $friendId) {
      userId
      friendId
      status
      createdAt
      updatedAt
    }
  }
`;

// フレンド一覧を取得
export const listFriends = gql`
  query listFriends($userId: String!, $nextToken: String) {
    listFriends(userId: $userId, limit: 50, nextToken: $nextToken) {
      items {
        userId
        friendId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// フレンドリクエストを取得
export const getFriendRequest = gql`
  query getFriendRequest($requestId: String!) {
    getFriendRequest(requestId: $requestId) {
      requestId
      senderId
      receiverId
      status
      createdAt
      updatedAt
    }
  }
`;

// 受信したフレンドリクエスト一覧を取得
export const listReceivedFriendRequests = gql`
  query listReceivedFriendRequests($receiverId: String!, $nextToken: String) {
    listReceivedFriendRequests(receiverId: $receiverId, limit: 50, nextToken: $nextToken) {
      items {
        requestId
        senderId
        receiverId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// 送信したフレンドリクエスト一覧を取得
export const listSentFriendRequests = gql`
  query listSentFriendRequests($senderId: String!, $nextToken: String) {
    listSentFriendRequests(senderId: $senderId, limit: 50, nextToken: $nextToken) {
      items {
        requestId
        senderId
        receiverId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
