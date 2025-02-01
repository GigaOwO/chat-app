'use client';

import { useState } from 'react';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import type { Profiles } from '@/_lib/graphql/API';
import { SettingsModalPresentation } from './presentational';
import type { TabId } from './types';
import { useRouter } from 'next/navigation';

interface SettingsContainerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profiles;
}

export function SettingsContainer({ isOpen, onClose, profile }: SettingsContainerProps) {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const { modifyProfile, removeProfile, loading } = useProfiles();
  const router = useRouter();

  const handleGeneralSubmit = async (username: string) => {
    await modifyProfile({
      userId: profile.userId,
      profileId: profile.profileId,
      name: username,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  const handleProfileSubmit = async (themeColor: string) => {
    const customData = JSON.stringify({ themeColor });
    await modifyProfile({
      userId: profile.userId,
      profileId: profile.profileId,
      customData,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  const handleProfileDelete = async () => {
    await removeProfile({
      userId: profile.userId,
      profileId: profile.profileId
    });
    router.push('/profile/select');
  };

  return (
    <SettingsModalPresentation
      isOpen={isOpen}
      onClose={onClose}
      profile={profile}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      loading={loading}
      onGeneralSubmit={handleGeneralSubmit}
      onProfileSubmit={handleProfileSubmit}
      onProfileDelete={handleProfileDelete}
    />
  );
}