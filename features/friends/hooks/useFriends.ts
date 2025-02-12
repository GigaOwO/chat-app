import { useState, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getFriend, listFriends } from '../api/queries';
import { deleteFriend, blockFriend } from '../api/mutations';
import type {
  Friend,
  FriendsConnection,
  DeleteFriendInput,
  UpdateFriendInput,
} from '../types';

const client = generateClient();

export function useFriends() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // フレンドを取得
  const fetchFriend = useCallback(async (friendId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getFriend,
        variables: { friendId }
      }) as { data: { getFriend: Friend } };
      return response.data.getFriend;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // フレンド一覧を取得
  const fetchFriends = useCallback(async (userId: string, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listFriends,
        variables: { userId, nextToken }
      }) as { data: { listFriends: FriendsConnection } };
      return response.data.listFriends;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // フレンドを削除
  const removeFriend = useCallback(async (input: DeleteFriendInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: deleteFriend,
        variables: { input }
      }) as { data: { deleteFriend: Friend } };
      return response.data.deleteFriend;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // フレンドをブロック
  const blockFriendAction = useCallback(async (input: UpdateFriendInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: blockFriend,
        variables: { input }
      }) as { data: { updateFriend: Friend } };
      return response.data.updateFriend;
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
    fetchFriend,
    fetchFriends,
    removeFriend,
    blockFriend: blockFriendAction,
  };
}
