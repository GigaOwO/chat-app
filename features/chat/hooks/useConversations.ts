import { useState, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getConversation, listConversations } from '../api/queries';
import { createConversation, updateConversation, deleteConversation } from '../api/mutations';
import type {
  Conversation,
  ConversationsConnection,
  CreateConversationInput,
  UpdateConversationInput,
  DeleteConversationInput,
} from '../types';

const client = generateClient();

export function useConversations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 単一の会話を取得
  const fetchConversation = useCallback(async (conversationId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getConversation,
        variables: { conversationId }
      }) as { data: { getConversations: Conversation } };
      return response.data.getConversations;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 会話一覧を取得
  const fetchConversations = useCallback(async (limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listConversations,
        variables: { limit, nextToken }
      }) as { data: { listConversations: ConversationsConnection } };
      return response.data.listConversations;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 会話を作成
  const addConversation = useCallback(async (input: CreateConversationInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: createConversation,
        variables: { input }
      }) as { data: { createConversations: Conversation } };
      return response.data.createConversations;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 会話を更新
  const modifyConversation = useCallback(async (input: UpdateConversationInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: updateConversation,
        variables: { input }
      }) as { data: { updateConversations: Conversation } };
      return response.data.updateConversations;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 会話を削除
  const removeConversation = useCallback(async (input: DeleteConversationInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: deleteConversation,
        variables: { input }
      }) as { data: { deleteConversations: Conversation } };
      return response.data.deleteConversations;
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
    fetchConversation,
    fetchConversations,
    addConversation,
    modifyConversation,
    removeConversation,
  };
}
