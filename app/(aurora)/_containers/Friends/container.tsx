'use client';

import { useState } from 'react';
import { FriendsModalPresentation } from './presentational';
import type { FriendRequests } from '@/_lib/graphql/API';

interface FriendsContainerProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  initialRequests: FriendRequests[];
}

export function FriendsContainer({
  isOpen,
  onClose,
  userId,
  initialRequests
}: FriendsContainerProps) {
  const [activeTab, setActiveTab] = useState<'friend' | 'requests' | 'search'>('friend');

  return (
    <FriendsModalPresentation
      isOpen={isOpen}
      onClose={onClose}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userId={userId}
      initialRequests={initialRequests}
    />
  );
}