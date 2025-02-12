import { gql } from 'graphql-request';

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
