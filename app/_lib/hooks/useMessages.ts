import { useState, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getMessage,
  getMessagesByConversationId,
  getMessagesBySenderId,
  createMessage,
  updateMessage,
  deleteMessage,
} from '@/_lib/Featchers/Messages/featcher';
import { onCreateMessages } from '@/_lib/graphql/subscriptions';
import type {
  CreateMessagesInput,
  UpdateMessagesInput,
  DeleteMessagesInput,
  Messages,
  MessagesConnection,
} from '@/_lib/graphql/API';

const client = generateClient();

interface MessagesState {
  loading: boolean;
  error: Error | null;
}

export function useMessages() {
  const [state, setState] = useState<MessagesState>({
    loading: false,
    error: null
  });

  // メッセージを取得
  const fetchMessage = useCallback(async (messageId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: getMessage,
        variables: { messageId }
      }) as { data: { getMessages: Messages } };
      return response.data.getMessages;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // 会話IDでメッセージを検索
  const fetchMessagesByConversationId = useCallback(async (conversationId: string, limit?: number, nextToken?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: getMessagesByConversationId,
        variables: { conversationId, limit, nextToken }
      }) as { data: { queryMessagesByConversationIdCreatedAtIndex: MessagesConnection } };
      return response.data.queryMessagesByConversationIdCreatedAtIndex;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // 送信者IDでメッセージを検索
  const fetchMessagesBySenderId = useCallback(async (senderId: string, limit?: number, nextToken?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: getMessagesBySenderId,
        variables: { senderId, limit, nextToken }
      }) as { data: { queryMessagesBySenderIdCreatedAtIndex: MessagesConnection } };
      return response.data.queryMessagesBySenderIdCreatedAtIndex;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // メッセージを作成
  const addMessage = useCallback(async (input: CreateMessagesInput) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: createMessage,
        variables: { input }
      }) as { data: { createMessages: Messages } };
      return response.data.createMessages;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // メッセージを更新
  const modifyMessage = useCallback(async (input: UpdateMessagesInput) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: updateMessage,
        variables: { input }
      }) as { data: { updateMessages: Messages } };
      return response.data.updateMessages;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // メッセージを削除
  const removeMessage = useCallback(async (input: DeleteMessagesInput) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await client.graphql({
        query: deleteMessage,
        variables: { input }
      }) as { data: { deleteMessages: Messages } };
      return response.data.deleteMessages;
    } catch (err) {
      setState(prev => ({ ...prev, error: err as Error }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // メッセージのサブスクリプション
  const subscribeToNewMessages = useCallback((conversationId: string, callbacks: {
    next: (message: Messages) => void;
    error: (error: Error) => void;
  }) => {
    const subscription = client.graphql({
      query: onCreateMessages,
      variables: { conversationId }
    }).subscribe({
      next: ({ data }) => {
        if (data?.onCreateMessages) {
          callbacks.next(data.onCreateMessages as Messages);
        }
      },
      error: (error: Error) => {
        callbacks.error(error);
      }
    });

    return subscription;
  }, []);

  return {
    loading: state.loading,
    error: state.error,
    fetchMessage,
    fetchMessagesByConversationId,
    fetchMessagesBySenderId,
    addMessage,
    modifyMessage,
    removeMessage,
    subscribeToNewMessages,
  };
}
