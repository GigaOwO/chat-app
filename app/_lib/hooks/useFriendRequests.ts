import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getFriendRequest,
  getFriendRequestsBySenderId,
  getFriendRequestsByReceiverId,
  createFriendRequest,
  updateFriendRequest,
  deleteFriendRequest,
} from '@/_lib/Featchers/FriendRequests/featcher';
import type {
  CreateFriendRequestsInput,
  UpdateFriendRequestsInput,
  DeleteFriendRequestsInput,
  FriendRequests,
  FriendRequestsConnection,
} from '@/_lib/graphql/API';

const client = generateClient();

export function useFriendRequests() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // フレンドリクエストを取得
  const fetchFriendRequest = async (requestId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getFriendRequest,
        variables: { requestId }
      }) as { data: { getFriendRequests: FriendRequests } };
      return response.data.getFriendRequests;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 送信者IDでフレンドリクエストを検索
  const fetchFriendRequestsBySenderId = async (senderId: string, limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getFriendRequestsBySenderId,
        variables: { senderId, limit, nextToken }
      }) as { data: { queryFriendRequestsBySenderIdIndex: FriendRequestsConnection } };
      return response.data.queryFriendRequestsBySenderIdIndex;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 受信者IDでフレンドリクエストを検索
  const fetchFriendRequestsByReceiverId = async (receiverId: string, limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getFriendRequestsByReceiverId,
        variables: { receiverId, limit, nextToken }
      }) as { data: { queryFriendRequestsByReceiverIdIndex: FriendRequestsConnection } };
      return response.data.queryFriendRequestsByReceiverIdIndex;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // フレンドリクエストを作成
  const addFriendRequest = async (input: CreateFriendRequestsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: createFriendRequest,
        variables: { input }
      }) as { data: { createFriendRequests: FriendRequests } };
      return response.data.createFriendRequests;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // フレンドリクエストを更新
  const modifyFriendRequest = async (input: UpdateFriendRequestsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: updateFriendRequest,
        variables: { input }
      }) as { data: { updateFriendRequests: FriendRequests } };
      return response.data.updateFriendRequests;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // フレンドリクエストを削除
  const removeFriendRequest = async (input: DeleteFriendRequestsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: deleteFriendRequest,
        variables: { input }
      }) as { data: { deleteFriendRequests: FriendRequests } };
      return response.data.deleteFriendRequests;
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
    fetchFriendRequest,
    fetchFriendRequestsBySenderId,
    fetchFriendRequestsByReceiverId,
    addFriendRequest,
    modifyFriendRequest,
    removeFriendRequest
  };
}