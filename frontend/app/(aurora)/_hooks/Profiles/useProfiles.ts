import { useCallback, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getProfile,
  listProfiles,
  queryProfilesByProfileId,
  queryProfilesByUserIdIsActive,
  createProfile,
  updateProfile,
  deleteProfile
} from '@/_lib/Featchers/Profiles/featcher';
import {
  ProfileStatus,
  CreateProfilesInput,
  UpdateProfilesInput,
  DeleteProfilesInput,
  TableProfilesFilterInput
} from '@/_lib/graphql/API';

const client = generateClient();

interface UseProfilesOptions {
  userId: string;
}

export const useProfiles = ({ userId }: UseProfilesOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // プロフィールを取得
  const getProfileById = useCallback(async (profileId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getProfile,
        variables: {
          userId,
          profileId
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

  // プロフィール一覧を取得
  const getProfilesList = useCallback(async (
    filter?: TableProfilesFilterInput,
    limit?: number,
    nextToken?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: listProfiles,
        variables: {
          filter: {
            ...filter,
            userId: { eq: userId }
          },
          limit,
          nextToken
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

  // プロフィールIDで検索
  const searchProfilesByProfileId = useCallback(async (
    profileId: string,
    first?: number,
    after?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: queryProfilesByProfileId,
        variables: {
          profileId,
          first,
          after
        }
      });
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // アクティブなプロフィールを取得
  const getActiveProfiles = useCallback(async (
    first?: number,
    after?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: queryProfilesByUserIdIsActive,
        variables: {
          userId,
          first,
          after
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

  // プロフィールを作成
  const createNewProfile = useCallback(async (
    name: string,
    isActive: boolean = false,
    avatarKey?: string,
    bio?: string,
    status?: ProfileStatus,
    order: number = 0,
    customData?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: CreateProfilesInput = {
        profileId: `${userId}-${Date.now()}`,
        userId,
        isActive,
        name,
        avatarKey,
        bio,
        status,
        order,
        customData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql({
        query: createProfile,
        variables: { input }
      });
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // プロフィールを更新
  const updateExistingProfile = useCallback(async (
    profileId: string,
    updates: Partial<{
      isActive: boolean;
      name: string;
      avatarKey: string;
      bio: string;
      status: ProfileStatus;
      order: number;
      customData: string;
    }>
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: UpdateProfilesInput = {
        profileId,
        userId,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      const response = await client.graphql({
        query: updateProfile,
        variables: { input }
      });
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // プロフィールを削除
  const removeProfile = useCallback(async (profileId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: DeleteProfilesInput = {
        profileId,
        userId
      };
      const response = await client.graphql({
        query: deleteProfile,
        variables: { input }
      });
      return response;
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
    getProfileById,
    getProfilesList,
    searchProfilesByProfileId,
    getActiveProfiles,
    createNewProfile,
    updateExistingProfile,
    removeProfile
  };
};