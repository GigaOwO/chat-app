import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { 
  getUser, 
  listUsers, 
  getUsersByEmail,
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
  const fetchUser = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getUser,
        variables: { username }
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
  const searchUsers = async ({username,ne,limit}:{username:string,ne:string,limit:number}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listUsers,
        variables: { username, ne, limit }
      }) as { data: { listUsers: UsersConnection } };
      return response.data.listUsers;
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
        query: getUsersByEmail,
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

  // ユーザーを作成
  const addUser = async (input: CreateUsersInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: createUser,
        variables: { input }
      }) as { data: { createUsers: Users } };
      return response.data.createUsers;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ユーザーを更新
  const modifyUser = async (input: UpdateUsersInput) => {
    setLoading(true);
    setError(null);
    try {
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
    searchUsers,
    searchUsersByEmail,
    addUser,
    modifyUser,
    removeUser
  };
}