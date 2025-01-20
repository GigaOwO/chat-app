import { useCallback, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getConversation,
  listConversations,
  createConversation,
  updateConversation,
  deleteConversation,
  onCreateConversation,
  onUpdateConversation,
  onDeleteConversation
} from '@/_lib/Featchers/Conversations/fetcher';
import {
  ConversationType,
  CreateConversationsInput,
  UpdateConversationsInput,
  DeleteConversationsInput,
  TableConversationsFilterInput,
  Conversations,
  CreateConversationsMutation,
  UpdateConversationsMutation,
  DeleteConversationsMutation,
  OnCreateConversationsSubscription,
  OnUpdateConversationsSubscription,
  OnDeleteConversationsSubscription
} from '@/_lib/graphql/API';
import { GraphQLSubscription } from '@aws-amplify/api';

const client = generateClient();

type SubscriptionCallback<T> = (data: T) => void;

export const useConversations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 会話を取得
  const getConversationById = useCallback(async (conversationId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getConversation,
        variables: {
          conversationId
        }
      }) as { data: { getConversations: Conversations } };
      return response.data.getConversations;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 会話一覧を取得
  const getConversationsList = useCallback(async (
    filter?: TableConversationsFilterInput,
    limit?: number,
    nextToken?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listConversations,
        variables: {
          filter,
          limit,
          nextToken
        }
      }) as { data: { listConversations: { items: Conversations[], nextToken: string | null } } };
      return response.data.listConversations;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 会話を作成
  const createNewConversation = useCallback(async (
    type: ConversationType,
    name?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: CreateConversationsInput = {
        conversationId: `conv-${Date.now()}`,
        type,
        name,
        lastMessageAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql<CreateConversationsMutation>({
        query: createConversation,
        variables: { input }
      }) as { data: { createConversations: Conversations } };
      return response.data.createConversations;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 会話を更新
  const updateExistingConversation = useCallback(async (
    conversationId: string,
    updates: Partial<{
      type: ConversationType;
      name: string;
      lastMessageAt: string;
    }>
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: UpdateConversationsInput = {
        conversationId,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql<UpdateConversationsMutation>({
        query: updateConversation,
        variables: { input }
      }) as { data: { updateConversations: Conversations } };
      return response.data.updateConversations;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 会話を削除
  const removeConversation = useCallback(async (conversationId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: DeleteConversationsInput = {
        conversationId
      };
      const response = await client.graphql<DeleteConversationsMutation>({
        query: deleteConversation,
        variables: { input }
      }) as { data: { deleteConversations: Conversations } };
      return response.data.deleteConversations;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // サブスクリプション
  const subscribeToNewConversations = useCallback((
    callback: SubscriptionCallback<OnCreateConversationsSubscription['onCreateConversations']>
  ) => {
    return client.graphql<GraphQLSubscription<OnCreateConversationsSubscription>>({
      query: onCreateConversation
    }).subscribe({
      next: ({ data }) => {
        if (data?.onCreateConversations) {
          callback(data.onCreateConversations);
        }
      },
      error: (graphQLError: Error) => {
        console.error('Subscription error:', graphQLError);
      }
    });
  }, []);

  const subscribeToConversationUpdates = useCallback((
    callback: SubscriptionCallback<OnUpdateConversationsSubscription['onUpdateConversations']>
  ) => {
    return client.graphql<GraphQLSubscription<OnUpdateConversationsSubscription>>({
      query: onUpdateConversation
    }).subscribe({
      next: ({ data }) => {
        if (data?.onUpdateConversations) {
          callback(data.onUpdateConversations);
        }
      },
      error: (graphQLError: Error) => {
        console.error('Subscription error:', graphQLError);
      }
    });
  }, []);

  const subscribeToConversationDeletions = useCallback((
    callback: SubscriptionCallback<OnDeleteConversationsSubscription['onDeleteConversations']>
  ) => {
    return client.graphql<GraphQLSubscription<OnDeleteConversationsSubscription>>({
      query: onDeleteConversation
    }).subscribe({
      next: ({ data }) => {
        if (data?.onDeleteConversations) {
          callback(data.onDeleteConversations);
        }
      },
      error: (graphQLError: Error) => {
        console.error('Subscription error:', graphQLError);
      }
    });
  }, []);

  return {
    isLoading,
    error,
    getConversationById,
    getConversationsList,
    createNewConversation,
    updateExistingConversation,
    removeConversation,
    subscribeToNewConversations,
    subscribeToConversationUpdates,
    subscribeToConversationDeletions
  };
};