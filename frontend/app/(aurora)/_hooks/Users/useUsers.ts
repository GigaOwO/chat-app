import { useCallback, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getUser,
  listUsers,
  queryUsersByEmail,
  createUser,
  updateUser,
  deleteUser
} from '@/_lib/Featchers/Users/featcher';
import {
  TableUsersFilterInput,
  CreateUsersInput,
  UpdateUsersInput,
  DeleteUsersInput,
  Users
} from '@/_lib/graphql/API';

const client = generateClient();

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ユーザーを取得
  const getUserByUsername = useCallback(async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getUser,
        variables: { username }
      }) as { data: { getUsers: Users } };
      return response.data.getUsers;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ユーザー一覧を取得
  const getUsersList = useCallback(async (
    filter?: TableUsersFilterInput,
    limit?: number,
    nextToken?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listUsers,
        variables: {
          filter,
          limit,
          nextToken
        }
      }) as { data: { listUsers: { items: Users[], nextToken: string | null } } };
      return response.data.listUsers;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // メールアドレスでユーザーを検索
  const searchUsersByEmail = useCallback(async (
    email: string,
    first?: number,
    after?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: queryUsersByEmail,
        variables: {
          email,
          first,
          after
        }
      }) as { data: { queryUsersByEmailIndex: { items: Users[], nextToken: string | null } } };
      return response.data.queryUsersByEmailIndex;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ユーザーを作成
  const createNewUser = useCallback(async (
    username: string,
    email: string,
    sub?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: CreateUsersInput = {
        username,
        email,
        sub,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql({
        query: createUser,
        variables: { input }
      }) as { data: { createUsers: Users } };
      return response.data.createUsers;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ユーザー情報を更新
  const updateUserInfo = useCallback(async (
    username: string,
    updates: Partial<{
      email: string;
      sub: string;
    }>
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: UpdateUsersInput = {
        username,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql({
        query: updateUser,
        variables: { input }
      }) as { data: { updateUsers: Users } };
      return response.data.updateUsers;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ユーザーを削除
  const removeUser = useCallback(async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: DeleteUsersInput = {
        username
      };
      const response = await client.graphql({
        query: deleteUser,
        variables: { input }
      }) as { data: { deleteUsers: Users } };
      return response.data.deleteUsers;
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
    getUserByUsername,
    getUsersList,
    searchUsersByEmail,
    createNewUser,
    updateUserInfo,
    removeUser
  };
};