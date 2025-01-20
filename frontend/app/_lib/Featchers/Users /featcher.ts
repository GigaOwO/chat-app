import { gql } from 'graphql-request';

// ユーザーを取得
export const getUser = gql`
  query getUser($username: String!) {
    getUsers(username: $username) {
      username
      email
      sub
      createdAt
      updatedAt
      sentRequests {
        nextToken
      }
      receivedRequests {
        nextToken
      }
      friends {
        nextToken
      }
    }
  }
`;

// ユーザー一覧を取得
export const listUsers = gql`
  query listUsers(
    $filter: TableUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        username
        email
        sub
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// メールアドレスでユーザーを検索
export const queryUsersByEmail = gql`
  query queryUsersByEmail(
    $email: String!
    $first: Int
    $after: String
  ) {
    queryUsersByEmailIndex(
      email: $email
      first: $first
      after: $after
    ) {
      items {
        username
        email
        sub
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// ユーザーを作成
export const createUser = gql`
  mutation createUser($input: CreateUsersInput!) {
    createUsers(input: $input) {
      username
      email
      sub
      createdAt
      updatedAt
      sentRequests {
        nextToken
      }
      receivedRequests {
        nextToken
      }
      friends {
        nextToken
      }
    }
  }
`;

// ユーザーを更新
export const updateUser = gql`
  mutation updateUser($input: UpdateUsersInput!) {
    updateUsers(input: $input) {
      username
      email
      sub
      createdAt
      updatedAt
      sentRequests {
        nextToken
      }
      receivedRequests {
        nextToken
      }
      friends {
        nextToken
      }
    }
  }
`;

// ユーザーを削除
export const deleteUser = gql`
  mutation deleteUser($input: DeleteUsersInput!) {
    deleteUsers(input: $input) {
      username
      email
      sub
      createdAt
      updatedAt
      sentRequests {
        nextToken
      }
      receivedRequests {
        nextToken
      }
      friends {
        nextToken
      }
    }
  }
`;

// ユーザー作成のサブスクリプション
export const onCreateUser = gql`
  subscription onCreateUser(
    $username: String
    $email: String
    $sub: String
  ) {
    onCreateUsers(
      username: $username
      email: $email
      sub: $sub
    ) {
      username
      email
      sub
      createdAt
      updatedAt
      sentRequests {
        nextToken
      }
      receivedRequests {
        nextToken
      }
      friends {
        nextToken
      }
    }
  }
`;

// ユーザー更新のサブスクリプション
export const onUpdateUser = gql`
  subscription onUpdateUser(
    $username: String
    $email: String
    $sub: String
  ) {
    onUpdateUsers(
      username: $username
      email: $email
      sub: $sub
    ) {
      username
      email
      sub
      createdAt
      updatedAt
      sentRequests {
        nextToken
      }
      receivedRequests {
        nextToken
      }
      friends {
        nextToken
      }
    }
  }
`;

// ユーザー削除のサブスクリプション
export const onDeleteUser = gql`
  subscription onDeleteUser(
    $username: String
    $email: String
    $sub: String
  ) {
    onDeleteUsers(
      username: $username
      email: $email
      sub: $sub
    ) {
      username
      email
      sub
      createdAt
      updatedAt
      sentRequests {
        nextToken
      }
      receivedRequests {
        nextToken
      }
      friends {
        nextToken
      }
    }
  }
`;