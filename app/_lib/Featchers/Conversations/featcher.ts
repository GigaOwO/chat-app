import { gql } from 'graphql-request';

// 会話を取得
export const getConversation = gql`
  query getConversation($conversationId: String!) {
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
  query listConversations($nextToken: String) {
    listConversations(limit: 50, nextToken: $nextToken) {
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