import { gql } from 'graphql-request';

// 特定の会話を取得
export const getConversation = gql`
  query getConversation($conversationId: ID!) {
    getConversations(conversationId: $conversationId) {
      conversationId
      type
      name
      lastMessageAt
      createdAt
      updatedAt
    }
  }
`;

// 会話一覧を取得
export const listConversations = gql`
  query listConversations(
    $filter: TableConversationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        conversationId
        type
        name
        lastMessageAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// 会話を作成
export const createConversation = gql`
  mutation createConversation($input: CreateConversationsInput!) {
    createConversations(input: $input) {
      conversationId
      type
      name
      lastMessageAt
      createdAt
      updatedAt
    }
  }
`;

// 会話を更新
export const updateConversation = gql`
  mutation updateConversation($input: UpdateConversationsInput!) {
    updateConversations(input: $input) {
      conversationId
      type
      name
      lastMessageAt
      createdAt
      updatedAt
    }
  }
`;

// 会話を削除
export const deleteConversation = gql`
  mutation deleteConversation($input: DeleteConversationsInput!) {
    deleteConversations(input: $input) {
      conversationId
      type
      name
      lastMessageAt
      createdAt
      updatedAt
    }
  }
`;

// 会話作成のサブスクリプション
export const onCreateConversation = gql`
  subscription OnCreateConversation(
    $conversationId: ID
    $type: String
    $name: String
  ) {
    onCreateConversations(
      conversationId: $conversationId
      type: $type
      name: $name
    ) {
      conversationId
      type
      name
      lastMessageAt
      createdAt
      updatedAt
    }
  }
`;

// 会話更新のサブスクリプション
export const onUpdateConversation = gql`
  subscription OnUpdateConversation(
    $conversationId: ID
    $type: String
    $name: String
  ) {
    onUpdateConversations(
      conversationId: $conversationId
      type: $type
      name: $name
    ) {
      conversationId
      type
      name
      lastMessageAt
      createdAt
      updatedAt
    }
  }
`;

// 会話削除のサブスクリプション
export const onDeleteConversation = gql`
  subscription OnDeleteConversation(
    $conversationId: ID
    $type: String
    $name: String
  ) {
    onDeleteConversations(
      conversationId: $conversationId
      type: $type
      name: $name
    ) {
      conversationId
      type
      name
      lastMessageAt
      createdAt
      updatedAt
    }
  }
`;