import { gql } from 'graphql-request';

// ユーザーを取得
export const getUser = gql`
  query getUser($username: String!) {
    getUsers(username: $username) {
      username
      email
      sub
      status
      createdAt
      updatedAt
    }
  }
`;

// ユーザー一覧を取得
export const listUsers = gql`
  query listUsers($username: String, $ne: String, $limit: Int) {
    listUsers(filter: {username: {beginsWith: $username, ne: $ne}}, limit: $limit) {
      items {
        sub
        username
      }
    }
  }
`;

// メールアドレスでユーザーを検索
export const getUsersByEmail = gql`
  query getUsersByEmail($email: String!, $limit: Int, $nextToken: String) {
    queryUsersByEmailIndex(email: $email, first: $limit, after: $nextToken) {
      items {
        username
        email
        sub
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
      username
      email
      sub
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
      username
      email
      sub
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
      username
      email
      sub
      status
      createdAt
      updatedAt
    }
  }
`;