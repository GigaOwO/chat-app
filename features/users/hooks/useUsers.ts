import { useState, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getUser, listUsers } from '../api/queries';
import type { User, UsersConnection, UserFilter } from '../types';

const client = generateClient();

export function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 単一のユーザーを取得
  const fetchUser = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getUser,
        variables: { userId }
      }) as { data: { getUser: User } };
      return response.data.getUser;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ユーザー一覧を取得
  const fetchUsers = useCallback(async (filter?: UserFilter, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listUsers,
        variables: { filter, nextToken }
      }) as { data: { listUsers: UsersConnection } };
      return response.data.listUsers;
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
    fetchUser,
    fetchUsers,
  };
}
