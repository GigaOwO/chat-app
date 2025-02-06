'use client';

import { useState, useEffect, useCallback } from 'react';
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

  // プロフィール取得処理をメモ化
  const loadFriendProfile = useCallback(async (friend: Friends) => {
    try {
      const profile = await fetchProfile(friend.friendId, friend.friendProfileId);
      if (!profile) {
        throw new Error(`Failed to load profile for friend ${friend.friendId}`);
      }
      return profile;
    } catch (err) {
      console.error(`Error loading profile for friend ${friend.friendId}:`, err);
      throw err;
    }
  }, [fetchProfile]);

  // フレンド一覧取得処理をメモ化
  const loadFriends = useCallback(async () => {
    if (!currentProfile?.profileId) return;
    
    try {
      setError(null);
      const response = await fetchFriendsByUserProfileId(currentProfile.profileId);
      
      if (!response?.items) {
        throw new Error('フレンド情報の取得に失敗しました');
      }

      const friendItems = response.items.filter((friend): friend is Friends => friend !== null);
      
      const friendsWithProfiles = await Promise.all(
        friendItems.map(async (friend) => ({
          friend,
          profile: await loadFriendProfile(friend)
        }))
      );

      setFriends(friendsWithProfiles);
    } catch (err) {
      console.error('Error loading friends:', err);
      setError('フレンド一覧の読み込みに失敗しました');
      setFriends([]);
    }
  }, [currentProfile?.profileId, fetchFriendsByUserProfileId, loadFriendProfile]);

  // プロフィールが変更された時のみ実行
  useEffect(() => {
    if (currentProfile) {
      loadFriends();
    }
  }, [currentProfile, loadFriends]);

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