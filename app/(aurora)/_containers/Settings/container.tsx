'use client';

import { useState } from 'react';
import type { Profiles } from '@/_lib/graphql/API';
import { SettingsModalPresentation } from './presentational';
import type { TabId } from './types';
import { UserContext } from '../User/context';

interface SettingsContainerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profiles;
  user:UserContext|null;
}

export function SettingsContainer({ isOpen, onClose, profile, user }: SettingsContainerProps) {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  return (
    <SettingsModalPresentation
      isOpen={isOpen}
      onClose={onClose}
      profile={profile}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      user={user}
    />
  );
}