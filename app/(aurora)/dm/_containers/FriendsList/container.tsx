'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FriendsListPresentation } from './presentational';
import { useProfileContext } from '../../../_containers/Profile/context';
import { useFriends } from '@/_lib/hooks/useFriends';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import type { Friends, Profiles } from '@/_lib/graphql/API';

export interface FriendWithProfile {
  friend: Friends;
  profile: Profiles;
}

export function FriendsListContainer() {
  const router = useRouter();
  const { currentProfile, isLoading: profileLoading } = useProfileContext();
  const { fetchFriendsByUserProfileId, loading: friendsLoading } = useFriends();
  const { fetchProfile } = useProfiles();
  
  const [friends, setFriends] = useState<FriendWithProfile[]>([]);
  const [error, setError] = useState<string | null>(null);

  // プロフィール変更時のみ実行されるようにする
  useEffect(() => {
    // 非同期処理を内部関数として定義
    async function loadFriendsData() {
      if (!currentProfile?.profileId) return;
      
      try {
        setError(null);
        const response = await fetchFriendsByUserProfileId(currentProfile.profileId);
        
        if (!response?.items) {
          throw new Error('フレンド情報の取得に失敗しました');
        }

        const friendItems = response.items.filter((friend): friend is Friends => friend !== null);
        
        const friendsWithProfiles = await Promise.all(
          friendItems.map(async (friend) => {
            try {
              const profile = await fetchProfile(friend.friendId, friend.friendProfileId);
              if (!profile) {
                throw new Error(`Failed to load profile for friend ${friend.friendId}`);
              }
              return {
                friend,
                profile
              };
            } catch (err) {
              console.error(`Error loading profile for friend ${friend.friendId}:`, err);
              return null;
            }
          })
        );

        // nullを除外して設定
        setFriends(friendsWithProfiles.filter((item): item is FriendWithProfile => item !== null));
      } catch (err) {
        console.error('Error loading friends:', err);
        setError('フレンド一覧の読み込みに失敗しました');
        setFriends([]);
      }
    }

    loadFriendsData();
  }, [currentProfile?.profileId]); // currentProfile.profileIdのみを依存配列に含める

  const handleSelectFriend = (friendId: string) => {
    router.push(`/dm/${friendId}`);
  };

  return (
    <FriendsListPresentation
      friends={friends}
      loading={profileLoading || friendsLoading}
      error={error}
      onSelectFriend={handleSelectFriend}
    />
  );
}