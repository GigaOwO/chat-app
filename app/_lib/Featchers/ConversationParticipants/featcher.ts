import { gql } from 'graphql-request';

// 会話参加者を取得
export const getConversationParticipants = gql`
  query getConversationParticipants($conversationId: String!, $first: Int, $after: String) {
    listConversationParticipants(
      filter: { conversationId: { eq: $conversationId } }
      limit: $first
      nextToken: $after
    ) {
      items {
        conversationId
        userId
        lastReadAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// ユーザーIDで会話参加を検索
export const getConversationParticipantsByUserId = gql`
  query getConversationParticipantsByUserId($userId: String!, $first: Int, $after: String) {
    listConversationParticipants(
      filter: { userId: { eq: $userId } }
      limit: $first
      nextToken: $after
    ) {
      items {
        conversationId
        userId
        lastReadAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// 会話参加者を作成
export const createConversationParticipant = gql`
  mutation createConversationParticipant($input: CreateConversationParticipantsInput!) {
    createConversationParticipants(input: $input) {
      conversationId
      userId
      lastReadAt
      createdAt
      updatedAt
    }
  }
`;

// 会話参加者を更新
export const updateConversationParticipant = gql`
  mutation updateConversationParticipant($input: UpdateConversationParticipantsInput!) {
    updateConversationParticipants(input: $input) {
      conversationId
      userId
      lastReadAt
      createdAt
      updatedAt
    }
  }
`;

// 会話参加者を削除
export const deleteConversationParticipant = gql`
  mutation deleteConversationParticipant($input: DeleteConversationParticipantsInput!) {
    deleteConversationParticipants(input: $input) {
      conversationId
      userId
      lastReadAt
      createdAt
      updatedAt
    }
  }
`;