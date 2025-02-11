import { useState, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getConversationParticipants,
  getConversationParticipantsByUserId,
  createConversationParticipant,
  updateConversationParticipant,
  deleteConversationParticipant,
} from '@/_lib/Featchers/ConversationParticipants/featcher';
import type {
  CreateConversationParticipantsInput,
  UpdateConversationParticipantsInput,
  DeleteConversationParticipantsInput,
  ConversationParticipants,
  ConversationParticipantsConnection,
} from '@/_lib/graphql/API';

const client = generateClient();

export function useConversationParticipants() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 会話参加者を取得
  const fetchConversationParticipants = useCallback(async (
    conversationId: string,
    limit?: number,
    nextToken?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getConversationParticipants,
        variables: { conversationId, first: limit, after: nextToken }
      }) as { data: { listConversationParticipants: ConversationParticipantsConnection } };
      return response.data.listConversationParticipants;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ユーザーIDで会話参加を検索
  const fetchConversationParticipantsByUserId = useCallback(async (
    userId: string,
    limit?: number,
    nextToken?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getConversationParticipantsByUserId,
        variables: { userId, first: limit, after: nextToken }
      }) as { data: { queryConversationParticipantsByUserIdCreatedAtIndex: ConversationParticipantsConnection } };
      return response.data.queryConversationParticipantsByUserIdCreatedAtIndex;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 会話参加者を作成
  const addConversationParticipant = useCallback(async (input: CreateConversationParticipantsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: createConversationParticipant,
        variables: { input }
      }) as { data: { createConversationParticipants: ConversationParticipants } };
      return response.data.createConversationParticipants;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 会話参加者を更新
  const modifyConversationParticipant = useCallback(async (input: UpdateConversationParticipantsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: updateConversationParticipant,
        variables: { input }
      }) as { data: { updateConversationParticipants: ConversationParticipants } };
      return response.data.updateConversationParticipants;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 会話参加者を削除
  const removeConversationParticipant = useCallback(async (input: DeleteConversationParticipantsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: deleteConversationParticipant,
        variables: { input }
      }) as { data: { deleteConversationParticipants: ConversationParticipants } };
      return response.data.deleteConversationParticipants;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchConversationParticipants,
    fetchConversationParticipantsByUserId,
    addConversationParticipant,
    modifyConversationParticipant,
    removeConversationParticipant,
  };
}