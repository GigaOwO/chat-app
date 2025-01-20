import { useCallback, useState } from 'react';
import  API  from '@aws-amplify/api';
import {
  getFriend,
  listFriends,
  queryFriendsByFriendId,
  createFriend,
  updateFriend,
  deleteFriend
} from '@/_lib/Featchers/Friends/featcher';
import { 
  FriendStatus, 
  CreateFriendsInput,
  UpdateFriendsInput,
  DeleteFriendsInput,
  TableFriendsFilterInput 
} from '@/_lib/graphql/API';

interface UseFriendsOptions {
  userId: string;
}

export const useFriends = ({ userId }: UseFriendsOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 特定の友達関係を取得
  const getFriendship = useCallback(async (friendId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.graphql({
        query: getFriend,
        variables: {
          userId,
          friendId
        }
      });
      return response.data.getFriends;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // 友達一覧を取得
  const getFriendsList = useCallback(async (
    filter?: TableFriendsFilterInput,
    limit?: number,
    nextToken?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.graphql({
        query: listFriends,
        variables: {
          filter: {
            ...filter,
            userId: { eq: userId }
          },
          limit,
          nextToken
        }
      });
      return response.data.listFriends;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // 友達を検索
  const searchFriends = useCallback(async (
    friendId: string,
    first?: number,
    after?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.graphql({
        query: queryFriendsByFriendId,
        variables: {
          friendId,
          first,
          after
        }
      });
      return response.data.queryFriendsByFriendIdIndex;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 友達関係を作成
  const addFriend = useCallback(async (friendId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: CreateFriendsInput = {
        friendId,
        userId,
        status: FriendStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const response = await API.graphql({
        query: createFriend,
        variables: { input }
      });
      return response.data.createFriends;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // 友達関係を更新
  const updateFriendship = useCallback(async (
    friendId: string,
    status: FriendStatus
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: UpdateFriendsInput = {
        friendId,
        userId,
        status,
        updatedAt: new Date().toISOString()
      };
      const response = await API.graphql({
        query: updateFriend,
        variables: { input }
      });
      return response.data.updateFriends;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // 友達関係を削除
  const removeFriend = useCallback(async (friendId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: DeleteFriendsInput = {
        friendId,
        userId
      };
      const response = await API.graphql({
        query: deleteFriend,
        variables: { input }
      });
      return response.data.deleteFriends;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  return {
    isLoading,
    error,
    getFriendship,
    getFriendsList,
    searchFriends,
    addFriend,
    updateFriendship,
    removeFriend
  };
};