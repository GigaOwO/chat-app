import { gql } from 'graphql-request';

// ユーザーを取得
export const getUser = gql`
  query getUser($sub: String!) {
    getUsers(sub: $sub) {
      sub
      username
      email
      status
      createdAt
      updatedAt
    }
  }
`;

// ユーザー一覧を取得
export const listUsers = gql`
  query listUsers($nextToken: String) {
    listUsers(limit: 50, nextToken: $nextToken) {
      items {
        sub
        username
        email
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// メールアドレスでユーザーを検索
export const getUsersByEmailIndex = gql`
  query getUsersByEmailIndex($email: String!, $limit: Int, $nextToken: String) {
    queryUsersByEmailIndex(email: $email, first: $limit, after: $nextToken) {
      items {
        sub
        username
        email
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// ユーザー名でユーザーを検索
export const getUsersByUsernameIndex = gql`
  query getUsersByUsernameIndex($username: String!, $limit: Int, $nextToken: String) {
    queryUsersByUsernameIndex(username: $username, first: $limit, after: $nextToken) {
      items {
        sub
        username
        email
        status
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
      sub
      username
      email
      status
      createdAt
      updatedAt
    }
  }
`;

// ユーザー情報を更新
export const updateUser = gql`
  mutation updateUser($input: UpdateUsersInput!) {
    updateUsers(input: $input) {
      sub
      username
      email
      status
      createdAt
      updatedAt
    }
  }
`;

// ユーザーを削除
export const deleteUser = gql`
  mutation deleteUser($input: DeleteUsersInput!) {
    deleteUsers(input: $input) {
      sub
      username
      email
      status
      createdAt
      updatedAt
    }
  }
`;