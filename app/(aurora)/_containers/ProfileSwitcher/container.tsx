'use client';

import { useProfileContext } from '../Profile/context';
import { ProfileSwitcherPresentation } from './presentational';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ProfileSwitcherContainer() {
  const router = useRouter();
  const { otherProfiles, isLoading, switchProfile, getThemeColorById } = useProfileContext();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleProfileSwitch = async (profileId: string) => {
    if (isSwitching) return;

    try {
      setIsSwitching(true);
      await switchProfile(profileId);
      router.push('/dm');
    } catch (error) {
      console.error('プロファイル切り替えエラー:', error);
      // エラー時の処理をここに追加（例：トースト表示など）
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <ProfileSwitcherPresentation
      profiles={otherProfiles}
      isLoading={isLoading || isSwitching}
      getThemeColorById={getThemeColorById}
      onProfileSwitch={handleProfileSwitch}
    />
  );
}
