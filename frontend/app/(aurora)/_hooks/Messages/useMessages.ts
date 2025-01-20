import { useCallback, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getMessage,
  listMessages,
  queryMessagesByConversationId,
  queryMessagesBySenderId,
  createMessage,
  updateMessage,
  deleteMessage,
  onCreateMessage,
  onUpdateMessage,
  onDeleteMessage
} from '@/_lib/Featchers/Messages/fetcher';
import {
  MessageType,
  MessageStatus,
  CreateMessagesInput,
  UpdateMessagesInput,
  DeleteMessagesInput,
  TableMessagesFilterInput,
  Messages,
  CreateMessagesMutation,
  UpdateMessagesMutation,
  DeleteMessagesMutation,
  OnCreateMessagesSubscription,
  OnUpdateMessagesSubscription,
  OnDeleteMessagesSubscription
} from '@/_lib/graphql/API';
import { GraphQLSubscription } from '@aws-amplify/api';

const client = generateClient();

type SubscriptionCallback<T> = (data: T) => void;

interface UseMessagesOptions {
  conversationId?: string;
  senderId?: string;
}

export const useMessages = (options: UseMessagesOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 特定のメッセージを取得
  const getMessageById = useCallback(async (messageId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getMessage,
        variables: { messageId }
      }) as { data: { getMessages: Messages } };
      return response.data.getMessages;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // メッセージ一覧を取得
  const getMessagesList = useCallback(async (
    filter?: TableMessagesFilterInput,
    limit?: number,
    nextToken?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listMessages,
        variables: {
          filter,
          limit,
          nextToken
        }
      }) as { data: { listMessages: { items: Messages[], nextToken: string | null } } };
      return response.data.listMessages;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 会話IDで関連するメッセージを取得
  const getMessagesByConversation = useCallback(async (
    conversationId: string,
    first?: number,
    after?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: queryMessagesByConversationId,
        variables: {
          conversationId,
          first,
          after
        }
      }) as { data: { queryMessagesByConversationIdCreatedAtIndex: { items: Messages[], nextToken: string | null } } };
      return response.data.queryMessagesByConversationIdCreatedAtIndex;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 送信者IDで関連するメッセージを取得
  const getMessagesBySender = useCallback(async (
    senderId: string,
    first?: number,
    after?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: queryMessagesBySenderId,
        variables: {
          senderId,
          first,
          after
        }
      }) as { data: { queryMessagesBySenderIdCreatedAtIndex: { items: Messages[], nextToken: string | null } } };
      return response.data.queryMessagesBySenderIdCreatedAtIndex;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // メッセージを作成
  const sendMessage = useCallback(async (
    content: string,
    senderId: string,
    conversationId: string,
    type: MessageType = MessageType.TEXT
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: CreateMessagesInput = {
        messageId: `msg-${Date.now()}`,
        conversationId,
        senderId,
        content,
        type,
        status: MessageStatus.SENT,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql<CreateMessagesMutation>({
        query: createMessage,
        variables: { input }
      }) as { data: { createMessages: Messages } };
      return response.data.createMessages;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // メッセージを更新
  const updateExistingMessage = useCallback(async (
    messageId: string,
    updates: Partial<{
      content: string;
      type: MessageType;
      status: MessageStatus;
    }>
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: UpdateMessagesInput = {
        messageId,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql<UpdateMessagesMutation>({
        query: updateMessage,
        variables: { input }
      }) as { data: { updateMessages: Messages } };
      return response.data.updateMessages;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // メッセージを削除
  const removeMessage = useCallback(async (messageId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: DeleteMessagesInput = {
        messageId
      };
      const response = await client.graphql<DeleteMessagesMutation>({
        query: deleteMessage,
        variables: { input }
      }) as { data: { deleteMessages: Messages } };
      return response.data.deleteMessages;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 新規メッセージのサブスクリプション
  const subscribeToNewMessages = useCallback((
    callback: SubscriptionCallback<OnCreateMessagesSubscription['onCreateMessages']>
  ) => {
    const subscriptionVariables = options.conversationId ? {
      conversationId: options.conversationId
    } : undefined;

    return client.graphql<GraphQLSubscription<OnCreateMessagesSubscription>>({
      query: onCreateMessage,
      variables: subscriptionVariables
    }).subscribe({
      next: ({ data }) => {
        if (data?.onCreateMessages) {
          callback(data.onCreateMessages);
        }
      },
      error: (err) => {
        console.error('Subscription error:', err);
      }
    });
  }, [options.conversationId]);

  // メッセージ更新のサブスクリプション
  const subscribeToMessageUpdates = useCallback((
    callback: SubscriptionCallback<OnUpdateMessagesSubscription['onUpdateMessages']>
  ) => {
    const subscriptionVariables = options.conversationId ? {
      conversationId: options.conversationId
    } : undefined;

    return client.graphql<GraphQLSubscription<OnUpdateMessagesSubscription>>({
      query: onUpdateMessage,
      variables: subscriptionVariables
    }).subscribe({
      next: ({ data }) => {
        if (data?.onUpdateMessages) {
          callback(data.onUpdateMessages);
        }
      },
      error: (err) => {
        console.error('Subscription error:', err);
      }
    });
  }, [options.conversationId]);

  // メッセージ削除のサブスクリプション
  const subscribeToMessageDeletions = useCallback((
    callback: SubscriptionCallback<OnDeleteMessagesSubscription['onDeleteMessages']>
  ) => {
    const subscriptionVariables = options.conversationId ? {
      conversationId: options.conversationId
    } : undefined;

    return client.graphql<GraphQLSubscription<OnDeleteMessagesSubscription>>({
      query: onDeleteMessage,
      variables: subscriptionVariables
    }).subscribe({
      next: ({ data }) => {
        if (data?.onDeleteMessages) {
          callback(data.onDeleteMessages);
        }
      },
      error: (err) => {
        console.error('Subscription error:', err);
      }
    });
  }, [options.conversationId]);

  return {
    isLoading,
    error,
    getMessageById,
    getMessagesList,
    getMessagesByConversation,
    getMessagesBySender,
    sendMessage,
    updateExistingMessage,
    removeMessage,
    subscribeToNewMessages,
    subscribeToMessageUpdates,
    subscribeToMessageDeletions
  };
};