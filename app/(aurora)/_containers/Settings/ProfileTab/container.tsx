'use client';

import { useState, useEffect, useCallback } from 'react';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import type { Profiles } from '@/_lib/graphql/API';
import { ProfileTabPresentation } from './presentational';
import { useProfileContext } from '../../Profile/context';
import { v4 as uuidv4 } from 'uuid';

interface ProfileTabContainerProps {
  currentProfile: Profiles;
}

export function ProfileTabContainer({ currentProfile }: ProfileTabContainerProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profiles | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { fetchProfilesByUserId, modifyProfile, addProfile, loading } = useProfiles();
  const { refreshProfiles } = useProfileContext();
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // プロフィール一覧を取得する関数をメモ化
  const loadProfiles = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchProfilesByUserId(currentProfile.userId);
      if (response?.items) {
        const sortedProfiles = response.items
          .filter((p): p is Profiles => p !== null)
          .sort((a, b) => a.order - b.order);
        setProfiles(sortedProfiles);
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
  }, [loadProfiles]);

  const handleProfileSelect = useCallback((profile: Profiles) => {
    setIsCreating(false);
    setSelectedProfile(profile);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedProfile(null);
    setIsCreating(false);
  }, []);

  const handleCreateNew = useCallback(() => {
    setSelectedProfile(null);
    setIsCreating(true);
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

      await loadProfiles();
      setSelectedProfile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }, [selectedProfile, modifyProfile, loadProfiles]);

  const handleCreateProfile = useCallback(async (formData: {
    name: string;
    bio: string;
    themeColor: string;
    avatarKey: string | null;
  }) => {
    try {
      const customData = JSON.stringify({ themeColor: formData.themeColor });
      const maxOrder = Math.max(...profiles.map(p => p.order), -1);
      
      await addProfile({
        profileId: `${currentProfile.userId}-${uuidv4()}`,
        userId: currentProfile.userId,
        name: formData.name,
        bio: formData.bio || null,
        avatarKey: formData.avatarKey,
        order: maxOrder + 1,
        customData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await Promise.all([
        loadProfiles(),
        refreshProfiles()
      ]);
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }, [currentProfile.userId, profiles, addProfile, loadProfiles]);

  return (
    <ProfileTabPresentation
      profiles={profiles}
      selectedProfile={selectedProfile}
      isCreating={isCreating}
      onProfileSelect={handleProfileSelect}
      onBackToList={handleBackToList}
      onProfileSubmit={handleProfileSubmit}
      onCreateProfile={handleCreateProfile}
      onCreateNew={handleCreateNew}
      isLoading={isLoading || loading}
    />
  );
}