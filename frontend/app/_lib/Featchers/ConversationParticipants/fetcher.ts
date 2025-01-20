import { gql } from 'graphql-request';

// 特定の参加者を取得
export const getConversationParticipant = gql`
  query getConversationParticipant($conversationId: ID!, $userId: ID!) {
    getConversationParticipants(conversationId: $conversationId, userId: $userId) {
      conversationId
      userId
      lastReadAt
      createdAt
      updatedAt
    }
  }
`;

// 参加者一覧を取得
export const listConversationParticipants = gql`
  query listConversationParticipants(
    $filter: TableConversationParticipantsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversationParticipants(filter: $filter, limit: $limit, nextToken: $nextToken) {
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

// ユーザーIDと作成日時で参加者を検索
export const queryParticipantsByUserIdCreatedAt = gql`
  query queryParticipantsByUserIdCreatedAt(
    $userId: ID!
    $first: Int
    $after: String
  ) {
    queryConversationParticipantsByUserIdCreatedAtIndex(
      userId: $userId
      first: $first
      after: $after
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

// 参加者を追加
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

// 参加者情報を更新
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

// 参加者を削除
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