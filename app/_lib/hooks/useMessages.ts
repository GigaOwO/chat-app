import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getMessage,
  getMessagesByConversationId,
  getMessagesBySenderId,
  createMessage,
  updateMessage,
  deleteMessage,
} from '@/_lib/Featchers/Messages/featcher';
import type {
  CreateMessagesInput,
  UpdateMessagesInput,
  DeleteMessagesInput,
  Messages,
  MessagesConnection,
} from '@/_lib/graphql/API';

const client = generateClient();

export function useMessages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // メッセージを取得
  const fetchMessage = async (messageId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getMessage,
        variables: { messageId }
      }) as { data: { getMessages: Messages } };
      return response.data.getMessages;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 会話IDでメッセージを検索
  const fetchMessagesByConversationId = async (conversationId: string, limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getMessagesByConversationId,
        variables: { conversationId, limit, nextToken }
      }) as { data: { queryMessagesByConversationIdCreatedAtIndex: MessagesConnection } };
      return response.data.queryMessagesByConversationIdCreatedAtIndex;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 送信者IDでメッセージを検索
  const fetchMessagesBySenderId = async (senderId: string, limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getMessagesBySenderId,
        variables: { senderId, limit, nextToken }
      }) as { data: { queryMessagesBySenderIdCreatedAtIndex: MessagesConnection } };
      return response.data.queryMessagesBySenderIdCreatedAtIndex;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // メッセージを作成
  const addMessage = async (input: CreateMessagesInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: createMessage,
        variables: { input }
      }) as { data: { createMessages: Messages } };
      return response.data.createMessages;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // メッセージを更新
  const modifyMessage = async (input: UpdateMessagesInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: updateMessage,
        variables: { input }
      }) as { data: { updateMessages: Messages } };
      return response.data.updateMessages;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // メッセージを削除
  const removeMessage = async (input: DeleteMessagesInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: deleteMessage,
        variables: { input }
      }) as { data: { deleteMessages: Messages } };
      return response.data.deleteMessages;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchMessage,
    fetchMessagesByConversationId,
    fetchMessagesBySenderId,
    addMessage,
    modifyMessage,
    removeMessage,
  };
}