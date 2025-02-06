'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FriendsListPresentation } from './presentational';
import { useProfileContext } from '../../../_containers/Profile/context';
import { useFriends } from '@/_lib/hooks/useFriends';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import type { Friends, Profiles } from '@/_lib/graphql/API';

export function FriendsListContainer() {
  const router = useRouter();
  const { currentProfile } = useProfileContext();
  const { fetchFriendsByUserProfileId } = useFriends();
  const { fetchProfile } = useProfiles();
  const [friends, setFriends] = useState<Array<{ friend: Friends; profile: Profiles }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFriends = async () => {
      // currentProfileがまだ読み込まれていない場合は何もしない
      if (!currentProfile) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetchFriendsByUserProfileId(currentProfile.profileId);
        
        if (response?.items) {
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
        }
      } catch (err) {
        console.error('Error loading friends:', err);
        setError('フレンド一覧の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadFriends();
  }, [currentProfile, fetchFriendsByUserProfileId, fetchProfile]);

  const handleSelectFriend = (friendId: string) => {
    router.push(`/dm/${friendId}`);
  };

  // ProfileContextのローディング状態も考慮
  const isLoading = loading || !currentProfile;

  return (
    <FriendsListPresentation
      friends={friends}
      loading={isLoading}
      error={error}
      onSelectFriend={handleSelectFriend}
    />
  );
}