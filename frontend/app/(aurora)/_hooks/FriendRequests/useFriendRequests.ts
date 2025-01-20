import { useCallback, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequest,
  getReceivedFriendRequests,
  listFriendRequests
} from '@/_lib/Featchers/FriendRequests/featcher';
import {
  FriendRequestStatus,
  CreateFriendRequestsInput,
  DeleteFriendRequestsInput,
  CreateFriendsInput,
  TableFriendRequestsFilterInput,
  FriendRequests,
  FriendStatus
} from '@/_lib/graphql/API';

const client = generateClient();

interface UseFriendRequestsOptions {
  userId: string;
}

export const useFriendRequests = ({ userId }: UseFriendRequestsOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 友達リクエストを送信
  const sendFriendRequest = useCallback(async (receiverId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: CreateFriendRequestsInput = {
        requestId: `fr-${Date.now()}`,
        receiverId,
        senderId: userId,
        status: FriendRequestStatus.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql({
        query: createFriendRequest,
        variables: { input }
      }) as { data: { createFriendRequests: FriendRequests } };
      return response.data.createFriendRequests;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // 友達リクエストを承認
  const acceptRequest = useCallback(async (requestId: string, senderId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const deleteInput: DeleteFriendRequestsInput = {
        requestId
      };
      
      const createInput: CreateFriendsInput = {
        friendId: senderId,
        userId: userId,
        status: FriendStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const response = await client.graphql({
        query: acceptFriendRequest,
        variables: {
          deleteInput,
          createInput
        }
      });
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // 友達リクエストを拒否
  const rejectRequest = useCallback(async (requestId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: DeleteFriendRequestsInput = {
        requestId
      };
      const response = await client.graphql({
        query: rejectFriendRequest,
        variables: { input }
      });
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 特定のリクエストを取得
  const getRequest = useCallback(async (requestId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getFriendRequest,
        variables: { requestId }
      }) as { data: { getFriendRequests: FriendRequests } };
      return response.data.getFriendRequests;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 受信したリクエスト一覧を取得
  const getReceivedRequests = useCallback(async (
    first?: number,
    after?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getReceivedFriendRequests,
        variables: {
          receiverId: userId,
          first,
          after
        }
      }) as { data: { queryFriendRequestsByReceiverIdIndex: { items: FriendRequests[], nextToken: string | null } } };
      return response.data.queryFriendRequestsByReceiverIdIndex;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // リクエスト一覧を取得（フィルター付き）
  const getRequestsList = useCallback(async (
    filter?: TableFriendRequestsFilterInput,
    limit?: number,
    nextToken?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listFriendRequests,
        variables: {
          filter,
          limit,
          nextToken
        }
      }) as { data: { listFriendRequests: { items: FriendRequests[], nextToken: string | null } } };
      return response.data.listFriendRequests;
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
    sendFriendRequest,
    acceptRequest,
    rejectRequest,
    getRequest,
    getReceivedRequests,
    getRequestsList
  };
};