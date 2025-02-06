'use client'

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
  const { fetchFriendsByUserProfileId } = useFriends();
  const { fetchProfile } = useProfiles();
  
  const [friends, setFriends] = useState<FriendWithProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFriends = async () => {
      if (!currentProfile?.profileId) return;
      
      try {
        setLoading(true);
        setError(null);

        const response = await fetchFriendsByUserProfileId(currentProfile.profileId);
        
        if (!response?.items) {
          throw new Error('フレンド情報の取得に失敗しました');
        }

        const friendsPromises = response.items
          .filter((friend): friend is Friends => friend !== null)
          .map(async (friend) => {
            const profile = await fetchProfile(friend.friendId, friend.friendProfileId);
            if (!profile) {
              throw new Error(`Failed to load profile for friend ${friend.friendId}`);
            }
            return {
              friend,
              profile
            };
          });

        const friendsWithProfiles = await Promise.all(friendsPromises);
        setFriends(friendsWithProfiles);
      } catch (err) {
        console.error('Error loading friends:', err);
        setError('フレンド一覧の読み込みに失敗しました');
        setFriends([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentProfile) {
      loadFriends();
    }
  }, [currentProfile, fetchFriendsByUserProfileId, fetchProfile]);

  const handleSelectFriend = (friendId: string) => {
    router.push(`/dm/${friendId}`);
  };

  // プロファイルのローディング中
  if (profileLoading) {
    return <FriendsListPresentation loading={true} friends={[]} error={null} onSelectFriend={() => {}} />;
  }

  // プロファイルが存在しない
  if (!currentProfile) {
    return <FriendsListPresentation loading={false} friends={[]} error="プロファイルが見つかりません" onSelectFriend={() => {}} />;
  }

  return (
    <FriendsListPresentation
      friends={friends}
      loading={loading}
      error={error}
      onSelectFriend={handleSelectFriend}
    />
  );
}