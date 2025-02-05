import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { 
  getUser, 
  listUsers, 
  getUsersByEmailIndex,
  getUsersByUsernameIndex,
  createUser,
  updateUser,
  deleteUser 
} from '@/_lib/Featchers/Users/featcher';
import type { 
  CreateUsersInput,
  UpdateUsersInput,
  DeleteUsersInput,
  Users,
  UsersConnection,
} from '@/_lib/graphql/API';

const client = generateClient();

export function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 単一ユーザーを取得
  const fetchUser = async (sub: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getUser,
        variables: { sub }
      }) as { data: { getUsers: Users } };
      return response.data.getUsers;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ユーザー一覧を取得
  const fetchUsers = async (nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listUsers,
        variables: { nextToken }
      }) as { data: { listUsers: UsersConnection } };
      return response.data.listUsers;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ユーザー名でユーザーを検索
  const searchUsersByUsername = async (username: string, limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getUsersByUsernameIndex,
        variables: { username, limit, nextToken }
      }) as { data: { queryUsersByUsernameIndex: UsersConnection } };
      return response.data.queryUsersByUsernameIndex;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // メールアドレスでユーザーを検索
  const searchUsersByEmail = async (email: string, limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getUsersByEmailIndex,
        variables: { email, limit, nextToken }
      }) as { data: { queryUsersByEmailIndex: UsersConnection } };
      return response.data.queryUsersByEmailIndex;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ユーザー名の利用可能性をチェック
  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getUsersByUsernameIndex,
        variables: { username, limit: 1 }
      }) as { data: { queryUsersByUsernameIndex: UsersConnection } };
      
      return !response.data.queryUsersByUsernameIndex.items?.length;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ユーザーを作成（ユーザー名の重複チェック付き）
  const addUser = async (input: CreateUsersInput) => {
    setLoading(true);
    setError(null);
    try {
      // まずユーザー名の利用可能性をチェック
      const isAvailable = await checkUsernameAvailability(input.username || '');
      if (!isAvailable) {
        throw new Error('このユーザーネームは既に使用されています');
      }

      // ユーザーを作成
      const response = await client.graphql({
        query: createUser,
        variables: { input }
      }) as { data: { createUsers: Users } };
      return response.data.createUsers;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ユーザーを更新
  const modifyUser = async (input: UpdateUsersInput) => {
    setLoading(true);
    setError(null);
    try {
      // ユーザー名を変更する場合は利用可能性をチェック
      if (input.username) {
        const isAvailable = await checkUsernameAvailability(input.username);
        if (!isAvailable) {
          throw new Error('このユーザーネームは既に使用されています');
        }
      }

      const response = await client.graphql({
        query: updateUser,
        variables: { input }
      }) as { data: { updateUsers: Users } };
      return response.data.updateUsers;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ユーザーを削除
  const removeUser = async (input: DeleteUsersInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: deleteUser,
        variables: { input }
      }) as { data: { deleteUsers: Users } };
      return response.data.deleteUsers;
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
    fetchUser,
    fetchUsers,
    searchUsersByUsername,
    searchUsersByEmail,
    checkUsernameAvailability,
    addUser,
    modifyUser,
    removeUser
  };
}