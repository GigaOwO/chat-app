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
