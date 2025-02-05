'use client';

import { useState } from 'react';
import { FriendsModalPresentation } from './presentational';
import type { FriendRequests } from '@/_lib/graphql/API';

interface FriendsContainerProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  username: string;
  profileId: string;
  initialRequests: FriendRequests[];
}

export function FriendsContainer({
  isOpen,
  onClose,
  userId,
  username,
  profileId,
  initialRequests
}: FriendsContainerProps) {
  const [activeTab, setActiveTab] = useState<'requests' | 'search'>('requests');

  return (
    <FriendsModalPresentation
      isOpen={isOpen}
      onClose={onClose}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userId={userId}
      username={username}
      profileId={profileId}
      initialRequests={initialRequests}
    />
  );
}