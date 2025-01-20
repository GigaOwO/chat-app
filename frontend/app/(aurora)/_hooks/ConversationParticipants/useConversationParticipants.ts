import { useCallback, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getConversationParticipant,
  listConversationParticipants,
  queryParticipantsByUserIdCreatedAt,
  createConversationParticipant,
  updateConversationParticipant,
  deleteConversationParticipant
} from '@/_lib/Featchers/ConversationParticipants/fetcher';
import {
  CreateConversationParticipantsInput,
  UpdateConversationParticipantsInput,
  DeleteConversationParticipantsInput,
  TableConversationParticipantsFilterInput,
  ConversationParticipants
} from '@/_lib/graphql/API';

const client = generateClient();

interface UseConversationParticipantsOptions {
  conversationId?: string;
  userId?: string;
}

export const useConversationParticipants = (options: UseConversationParticipantsOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 特定の参加者を取得
  const getParticipant = useCallback(async (
    conversationId: string,
    userId: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getConversationParticipant,
        variables: {
          conversationId,
          userId
        }
      }) as { data: { getConversationParticipants: ConversationParticipants } };
      return response.data.getConversationParticipants;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 参加者一覧を取得
  const getParticipantsList = useCallback(async (
    filter?: TableConversationParticipantsFilterInput,
    limit?: number,
    nextToken?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listConversationParticipants,
        variables: {
          filter: {
            ...filter,
            ...(options.conversationId && { conversationId: { eq: options.conversationId } }),
            ...(options.userId && { userId: { eq: options.userId } })
          },
          limit,
          nextToken
        }
      }) as { data: { listConversationParticipants: { items: ConversationParticipants[], nextToken: string | null } } };
      return response.data.listConversationParticipants;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [options.conversationId, options.userId]);

  // ユーザーIDと作成日時で参加者を検索
  const getParticipantsByUserId = useCallback(async (
    userId: string,
    first?: number,
    after?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: queryParticipantsByUserIdCreatedAt,
        variables: {
          userId,
          first,
          after
        }
      }) as { data: { queryConversationParticipantsByUserIdCreatedAtIndex: { items: ConversationParticipants[], nextToken: string | null } } };
      return response.data.queryConversationParticipantsByUserIdCreatedAtIndex;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 参加者を追加
  const addParticipant = useCallback(async (
    conversationId: string,
    userId: string,
    lastReadAt?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: CreateConversationParticipantsInput = {
        conversationId,
        userId,
        lastReadAt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql({
        query: createConversationParticipant,
        variables: { input }
      }) as { data: { createConversationParticipants: ConversationParticipants } };
      return response.data.createConversationParticipants;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 参加者情報を更新（最終既読時刻など）
  const updateParticipant = useCallback(async (
    conversationId: string,
    userId: string,
    lastReadAt: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: UpdateConversationParticipantsInput = {
        conversationId,
        userId,
        lastReadAt,
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql({
        query: updateConversationParticipant,
        variables: { input }
      }) as { data: { updateConversationParticipants: ConversationParticipants } };
      return response.data.updateConversationParticipants;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 参加者を削除（会話から退出）
  const removeParticipant = useCallback(async (
    conversationId: string,
    userId: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: DeleteConversationParticipantsInput = {
        conversationId,
        userId
      };
      const response = await client.graphql({
        query: deleteConversationParticipant,
        variables: { input }
      }) as { data: { deleteConversationParticipants: ConversationParticipants } };
      return response.data.deleteConversationParticipants;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    getParticipant,
    getParticipantsList,
    getParticipantsByUserId,
    addParticipant,
    updateParticipant,
    removeParticipant
  };
};