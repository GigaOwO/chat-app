import { useState, useCallback, useMemo } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  getProfile,
  getProfilesByUserId,
  getProfilesByProfileId,
  createProfile,
  updateProfile,
  deleteProfile,
} from '@/_lib/Featchers/Profiles/featcher';
import type {
  CreateProfilesInput,
  UpdateProfilesInput,
  DeleteProfilesInput,
  Profiles,
  ProfilesConnection,
} from '@/_lib/graphql/API';

export function useProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const client = useMemo(() => generateClient(), []);

  const fetchProfile = useCallback(async (userId: string, profileId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getProfile,
        variables: { userId, profileId }
      }) as { data: { getProfiles: Profiles } };
      return response.data.getProfiles;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [client]);

  const fetchProfilesByUserId = useCallback(async (userId: string, limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getProfilesByUserId,
        variables: { userId, limit, nextToken }
      }) as { data: { queryProfilesByUserIdOrderIndex: ProfilesConnection } };
      return response.data.queryProfilesByUserIdOrderIndex;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [client]);

  // プロフィールIDでプロフィールを検索
  const fetchProfilesByProfileId = useCallback(async (profileId: string, limit?: number, nextToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: getProfilesByProfileId,
        variables: { profileId, limit, nextToken }
      }) as { data: { queryProfilesByProfileIdIndex: ProfilesConnection } };
      return response.data.queryProfilesByProfileIdIndex;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [client]);

  // プロフィールを作成
  const addProfile = useCallback(async (input: CreateProfilesInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: createProfile,
        variables: { input }
      }) as { data: { createProfiles: Profiles } };
      return response.data.createProfiles;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [client]);

  // プロフィールを更新
  const modifyProfile = useCallback(async (input: UpdateProfilesInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: updateProfile,
        variables: { input }
      }) as { data: { updateProfiles: Profiles } };
      return response.data.updateProfiles;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [client]);

  // プロフィールを削除
  const removeProfile = useCallback(async (input: DeleteProfilesInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.graphql({
        query: deleteProfile,
        variables: { input }
      }) as { data: { deleteProfiles: Profiles } };
      return response.data.deleteProfiles;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [client]);

  // 戻り値をメモ化
  return useMemo(() => ({
    loading,
    error,
    fetchProfile,
    fetchProfilesByUserId,
    fetchProfilesByProfileId,
    addProfile,
    modifyProfile,
    removeProfile
  }), [
    loading,
    error,
    fetchProfile,
    fetchProfilesByUserId,
    fetchProfilesByProfileId,
    addProfile,
    modifyProfile,
    removeProfile
  ]);
}