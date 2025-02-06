import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getFriend,
  getFriendsByFriendId,
  getFriendsByUserProfileId,
  createFriend,
  updateFriend,
  deleteFriend,
} from '@/_lib/Featchers/Friends/featcher';
import type {
  CreateFriendsInput,
  UpdateFriendsInput,
  DeleteFriendsInput,
  Friends,
  FriendsConnection,
} from '@/_lib/graphql/API';

const client = generateClient();

export function useFriends() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // フレンド関係を取得
  const fetchFriend = async (userId: string, friendId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getFriend,
        variables: { userId, friendId }
      }) as { data: { getFriends: Friends } };
      return response.data.getFriends;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // フレンドIDでフレンド関係を検索
  const fetchFriendsByFriendId = async (friendId: string, limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getFriendsByFriendId,
        variables: { friendId, limit, nextToken }
      }) as { data: { queryFriendsByFriendIdIndex: FriendsConnection } };
      return response.data.queryFriendsByFriendIdIndex;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ユーザープロフィールIDでフレンド関係を検索
  const fetchFriendsByUserProfileId = async (userProfileId: string, limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getFriendsByUserProfileId,
        variables: { userProfileId, limit, nextToken }
      }) as { data: { queryFriendsByUserProfileIdIndex: FriendsConnection } };
      console.log('Friends response:', response); // デバッグ用
      return response.data.queryFriendsByUserProfileIdIndex;
    } catch (err) {
      console.error('Error fetching friends:', err); // デバッグ用
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // フレンド関係を作成
  const addFriend = async (input: CreateFriendsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: createFriend,
        variables: { input }
      }) as { data: { createFriends: Friends } };
      return response.data.createFriends;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // フレンド関係を更新
  const modifyFriend = async (input: UpdateFriendsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: updateFriend,
        variables: { input }
      }) as { data: { updateFriends: Friends } };
      return response.data.updateFriends;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // フレンド関係を削除
  const removeFriend = async (input: DeleteFriendsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: deleteFriend,
        variables: { input }
      }) as { data: { deleteFriends: Friends } };
      return response.data.deleteFriends;
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
    fetchFriend,
    fetchFriendsByFriendId,
    fetchFriendsByUserProfileId,
    addFriend,
    modifyFriend,
    removeFriend
  };
}