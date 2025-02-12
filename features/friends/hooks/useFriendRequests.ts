import { useState, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getFriendRequest,
  listReceivedFriendRequests,
  listSentFriendRequests,
} from '../api/queries';
import {
  createFriendRequest,
  updateFriendRequest,
} from '../api/mutations';
import type {
  FriendRequest,
  FriendRequestsConnection,
  CreateFriendRequestInput,
  UpdateFriendRequestInput,
} from '../types';

const client = generateClient();

export function useFriendRequests() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // フレンドリクエストを取得
  const fetchFriendRequest = useCallback(async (requestId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getFriendRequest,
        variables: { requestId }
      }) as { data: { getFriendRequest: FriendRequest } };
      return response.data.getFriendRequest;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 受信したフレンドリクエスト一覧を取得
  const fetchReceivedRequests = useCallback(async (receiverId: string, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listReceivedFriendRequests,
        variables: { receiverId, nextToken }
      }) as { data: { listReceivedFriendRequests: FriendRequestsConnection } };
      return response.data.listReceivedFriendRequests;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 送信したフレンドリクエスト一覧を取得
  const fetchSentRequests = useCallback(async (senderId: string, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listSentFriendRequests,
        variables: { senderId, nextToken }
      }) as { data: { listSentFriendRequests: FriendRequestsConnection } };
      return response.data.listSentFriendRequests;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // フレンドリクエストを送信
  const sendFriendRequest = useCallback(async (input: CreateFriendRequestInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: createFriendRequest,
        variables: { input }
      }) as { data: { createFriendRequest: FriendRequest } };
      return response.data.createFriendRequest;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // フレンドリクエストを更新（承認/拒否）
  const respondToRequest = useCallback(async (input: UpdateFriendRequestInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: updateFriendRequest,
        variables: { input }
      }) as { data: { updateFriendRequest: FriendRequest } };
      return response.data.updateFriendRequest;
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
    fetchFriendRequest,
    fetchReceivedRequests,
    fetchSentRequests,
    sendFriendRequest,
    respondToRequest,
  };
}
