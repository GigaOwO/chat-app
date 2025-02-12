import { gql } from 'graphql-request';

// フレンドリクエストを作成
export const createFriendRequest = gql`
  mutation createFriendRequest($input: CreateFriendRequestInput!) {
    createFriendRequest(input: $input) {
      requestId
      senderId
      receiverId
      status
      createdAt
      updatedAt
    }
  }
`;

// フレンドリクエストを更新（承認/拒否）
export const updateFriendRequest = gql`
  mutation updateFriendRequest($input: UpdateFriendRequestInput!) {
    updateFriendRequest(input: $input) {
      requestId
      senderId
      receiverId
      status
      createdAt
      updatedAt
    }
  }
`;

// フレンドを削除
export const deleteFriend = gql`
  mutation deleteFriend($input: DeleteFriendInput!) {
    deleteFriend(input: $input) {
      userId
      friendId
      status
      createdAt
      updatedAt
    }
  }
`;

// フレンドをブロック
export const blockFriend = gql`
  mutation blockFriend($input: UpdateFriendInput!) {
    updateFriend(input: $input) {
      userId
      friendId
      status
      createdAt
      updatedAt
    }
  }
`;
