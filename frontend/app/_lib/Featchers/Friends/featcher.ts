import { gql } from 'graphql-request';

// 特定の友達関係を取得
export const getFriend = gql`
  query getFriend($userId: String!, $friendId: String!) {
    getFriends(userId: $userId, friendId: $friendId) {
      friendId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;

// 友達一覧を取得
export const listFriends = gql`
  query listFriends(
    $filter: TableFriendsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        friendId
        userId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// フレンドIDで友達を検索
export const queryFriendsByFriendId = gql`
  query queryFriendsByFriendId(
    $friendId: String!
    $first: Int
    $after: String
  ) {
    queryFriendsByFriendIdIndex(
      friendId: $friendId
      first: $first
      after: $after
    ) {
      items {
        friendId
        userId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// 友達関係を作成
export const createFriend = gql`
  mutation createFriend($input: CreateFriendsInput!) {
    createFriends(input: $input) {
      friendId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;

// 友達関係を更新（ステータス変更など）
export const updateFriend = gql`
  mutation updateFriend($input: UpdateFriendsInput!) {
    updateFriends(input: $input) {
      friendId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;

// 友達関係を削除
export const deleteFriend = gql`
  mutation deleteFriend($input: DeleteFriendsInput!) {
    deleteFriends(input: $input) {
      friendId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;

// 友達関係の作成をサブスクライブ
export const onCreateFriend = gql`
  subscription OnCreateFriend(
    $friendId: String
    $userId: String
  ) {
    onCreateFriends(
      friendId: $friendId
      userId: $userId
    ) {
      friendId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;

// 友達関係の更新をサブスクライブ
export const onUpdateFriend = gql`
  subscription OnUpdateFriend(
    $friendId: String
    $userId: String
  ) {
    onUpdateFriends(
      friendId: $friendId
      userId: $userId
    ) {
      friendId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;

// 友達関係の削除をサブスクライブ
export const onDeleteFriend = gql`
  subscription OnDeleteFriend(
    $friendId: String
    $userId: String
  ) {
    onDeleteFriends(
      friendId: $friendId
      userId: $userId
    ) {
      friendId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;