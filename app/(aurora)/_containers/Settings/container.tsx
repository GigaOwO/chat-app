'use client';

import { useState } from 'react';
import type { Profiles } from '@/_lib/graphql/API';
import { SettingsModalPresentation } from './presentational';
import type { TabId } from './types';

interface SettingsContainerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profiles;
}

export function SettingsContainer({ isOpen, onClose, profile }: SettingsContainerProps) {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  return (
    <SettingsModalPresentation
      isOpen={isOpen}
      onClose={onClose}
      profile={profile}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}