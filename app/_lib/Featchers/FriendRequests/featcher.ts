import { gql } from 'graphql-request';

// フレンドリクエストを取得
export const getFriendRequest = gql`
  query getFriendRequest($requestId: String!) {
    getFriendRequests(requestId: $requestId) {
      requestId
      receiverId
      senderId
      senderProfileId
      status
      createdAt
      updatedAt
    }
  }
`;

// 送信者IDでフレンドリクエストを検索
export const getFriendRequestsBySenderId = gql`
  query getFriendRequestsBySenderId($senderId: String!, $limit: Int, $nextToken: String) {
    queryFriendRequestsBySenderIdIndex(senderId: $senderId, first: $limit, after: $nextToken) {
      items {
        requestId
        receiverId
        senderId
        senderProfileId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// 受信者IDでフレンドリクエストを検索
export const getFriendRequestsByReceiverId = gql`
  query getFriendRequestsByReceiverId($receiverId: String!, $limit: Int, $nextToken: String) {
    queryFriendRequestsByReceiverIdIndex(receiverId: $receiverId, first: $limit, after: $nextToken) {
      items {
        requestId
        receiverId
        senderId
        senderProfileId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// フレンドリクエストを作成
export const createFriendRequest = gql`
  mutation createFriendRequest($input: CreateFriendRequestsInput!) {
    createFriendRequests(input: $input) {
      requestId
      receiverId
      senderId
      senderProfileId
      status
      createdAt
      updatedAt
    }
  }
`;

// フレンドリクエストを更新
export const updateFriendRequest = gql`
  mutation updateFriendRequest($input: UpdateFriendRequestsInput!) {
    updateFriendRequests(input: $input) {
      requestId
      receiverId
      senderId
      senderProfileId
      status
      createdAt
      updatedAt
    }
  }
`;

// フレンドリクエストを削除
export const deleteFriendRequest = gql`
  mutation deleteFriendRequest($input: DeleteFriendRequestsInput!) {
    deleteFriendRequests(input: $input) {
      requestId
      receiverId
      senderId
      senderProfileId
      status
      createdAt
      updatedAt
    }
  }
`;

export const onCreateFriendRequests = gql`
  subscription onCreateFriendRequests($receiverId: String!) {
    onCreateFriendRequests(receiverId: $receiverId) {
      createdAt
      receiverId
      senderId
      requestId
      senderProfileId
      status
      updatedAt
    }
  }
`;