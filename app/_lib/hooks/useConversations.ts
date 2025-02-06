import { useState, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getConversation,
  listConversations,
  getConversationParticipant,
  getConversationParticipantsByUserId,
  createConversation,
  updateConversation,
  deleteConversation,
  createConversationParticipant
} from '@/_lib/Featchers/Conversations/featcher';
import type {
  CreateConversationsInput,
  UpdateConversationsInput,
  DeleteConversationsInput,
  CreateConversationParticipantsInput,
  Conversations,
  ConversationsConnection,
  ConversationParticipants,
  ConversationParticipantsConnection,
} from '@/_lib/graphql/API';

const client = generateClient();

interface ConversationsState {
  loading: boolean;
  error: Error | null;
}

export function useConversations() {
  const [state, setState] = useState<ConversationsState>({
    loading: false,
    error: null
  });

  // 会話を取得
  const fetchConversation = useCallback(async (conversationId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: getConversation,
        variables: { conversationId }
      }) as { data: { getConversations: Conversations } };
      return response.data.getConversations;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // 会話一覧を取得
  const fetchConversations = useCallback(async (nextToken?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: listConversations,
        variables: { nextToken }
      }) as { data: { listConversations: ConversationsConnection } };
      return response.data.listConversations;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // 会話参加者を取得
  const fetchConversationParticipant = useCallback(async (conversationId: string, userId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: getConversationParticipant,
        variables: { conversationId, userId }
      }) as { data: { getConversationParticipants: ConversationParticipants } };
      return response.data.getConversationParticipants;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // ユーザーIDで会話参加一覧を取得
  const fetchConversationParticipantsByUserId = useCallback(async (userId: string, limit?: number, nextToken?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: getConversationParticipantsByUserId,
        variables: { userId, limit, nextToken }
      }) as { data: { queryConversationParticipantsByUserIdCreatedAtIndex: ConversationParticipantsConnection } };
      return response.data.queryConversationParticipantsByUserIdCreatedAtIndex;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // 会話を作成
  const addConversation = useCallback(async (input: CreateConversationsInput) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: createConversation,
        variables: { input }
      }) as { data: { createConversations: Conversations } };
      return response.data.createConversations;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // 会話参加者を追加
  const addConversationParticipant = useCallback(async (input: CreateConversationParticipantsInput) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: createConversationParticipant, // 変更なし
        variables: { input }
      }) as { data: { createConversationParticipants: ConversationParticipants } };
      return response.data.createConversationParticipants;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // 会話を更新
  const modifyConversation = useCallback(async (input: UpdateConversationsInput) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: updateConversation,
        variables: { input }
      }) as { data: { updateConversations: Conversations } };
      return response.data.updateConversations;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // 会話を削除
  const removeConversation = useCallback(async (input: DeleteConversationsInput) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: deleteConversation,
        variables: { input }
      }) as { data: { deleteConversations: Conversations } };
      return response.data.deleteConversations;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  return {
    loading: state.loading,
    error: state.error,
    fetchConversation,
    fetchConversations,
    fetchConversationParticipant,
    fetchConversationParticipantsByUserId,
    addConversation,
    addConversationParticipant,
    modifyConversation,
    removeConversation
  };
}