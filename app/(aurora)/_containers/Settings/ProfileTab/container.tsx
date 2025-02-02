'use client';

import { useState, useEffect, useCallback } from 'react';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import type { Profiles } from '@/_lib/graphql/API';
import { ProfileTabPresentation } from './presentational';

interface ProfileTabContainerProps {
  currentProfile: Profiles;
}

export function ProfileTabContainer({ currentProfile }: ProfileTabContainerProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profiles | null>(null);
  const { fetchProfilesByUserId, modifyProfile, loading } = useProfiles();
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // プロフィール一覧を取得する関数をメモ化
  const loadProfiles = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchProfilesByUserId(currentProfile.userId);
      if (response?.items) {
        setProfiles(response.items.filter((p): p is Profiles => p !== null));
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentProfile.userId, fetchProfilesByUserId]);

  // コンポーネントのマウント時にプロフィール一覧を取得
  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]); // loadProfiles が変更された時に再取得

  const handleProfileSelect = useCallback((profile: Profiles) => {
    setSelectedProfile(profile);
  }, []);

  const handleProfileSubmit = useCallback(async (formData: {
    name: string;
    bio: string;
    themeColor: string;
    avatarKey: string | null;
  }) => {
    if (!selectedProfile) return;

    try {
      const customData = JSON.stringify({ themeColor: formData.themeColor });
      await modifyProfile({
        userId: selectedProfile.userId,
        profileId: selectedProfile.profileId,
        name: formData.name,
        bio: formData.bio || null,
        avatarKey: formData.avatarKey,
        customData,
        updatedAt: new Date().toISOString()
      });

      // プロフィール一覧を再取得
      await loadProfiles();
      // 編集モードを終了
      setSelectedProfile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }, [selectedProfile, modifyProfile, loadProfiles]);

  return (
    <ProfileTabPresentation
      profiles={profiles}
      selectedProfile={selectedProfile}
      onProfileSelect={handleProfileSelect}
      onBackToList={() => setSelectedProfile(null)}
      onProfileSubmit={handleProfileSubmit}
      isLoading={isLoading || loading}
    />
  );
}