import { gql } from 'graphql-request';

// フレンド関係を取得
export const getFriend = gql`
  query getFriend($userId: String!, $friendId: String!) {
    getFriends(userId: $userId, friendId: $friendId) {
      userId
      friendId
      status
      userProfileId
      friendProfileId
      createdAt
      updatedAt
    }
  }
`;

// フレンドIDで検索
export const getFriendsByFriendId = gql`
  query getFriendsByFriendId($friendId: String!, $limit: Int, $nextToken: String) {
    queryFriendsByFriendIdIndex(friendId: $friendId, first: $limit, after: $nextToken) {
      items {
        userId
        friendId
        status
        userProfileId
        friendProfileId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// ユーザープロフィールIDでフレンドを検索
export const getFriendsByUserProfileId = gql`
  query getFriendsByUserProfileId($userProfileId: String!, $limit: Int, $nextToken: String) {
    queryFriendsByUserProfileIdIndex(userProfileId: $userProfileId, first: $limit, after: $nextToken) {
      items {
        userId
        friendId
        status
        userProfileId
        friendProfileId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// フレンド関係を作成
export const createFriend = gql`
  mutation createFriend($input: CreateFriendsInput!) {
    createFriends(input: $input) {
      userId
      friendId
      status
      userProfileId
      friendProfileId
      createdAt
      updatedAt
    }
  }
`;

// フレンド関係を更新
export const updateFriend = gql`
  mutation updateFriend($input: UpdateFriendsInput!) {
    updateFriends(input: $input) {
      userId
      friendId
      status
      userProfileId
      friendProfileId
      createdAt
      updatedAt
    }
  }
`;

// フレンド関係を削除
export const deleteFriend = gql`
  mutation deleteFriend($input: DeleteFriendsInput!) {
    deleteFriends(input: $input) {
      userId
      friendId
      status
      userProfileId
      friendProfileId
      createdAt
      updatedAt
    }
  }
`;