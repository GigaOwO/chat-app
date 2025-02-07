'use client';

import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import Image from 'next/image';
import type { Profiles } from '@/_lib/graphql/API';
import { SettingsContainer } from '../Settings/container';
import { FriendsContainer } from '../Friends/container';
import { CurrentProfileSkeleton } from './skeleton';
import { ProfileImage } from '@/_components/ProfileImage';
import { useFriendRequestsContext } from '../Friends/FriendRequestsContext';
import { UserContext } from '../User/context';

interface CurrentProfilePresentationProps {
  profile: Profiles | null;
  isLoading: boolean;
  themeColor: string;
  isSettingsOpen: boolean;
  isFriendsOpen: boolean;
  onSettingsOpen: () => void;
  onSettingsClose: () => void;
  onFriendsOpen: () => void;
  onFriendsClose: () => void;
  user: UserContext | null;
}

export function CurrentProfilePresentation({
  profile,
  isLoading,
  themeColor,
  isSettingsOpen,
  isFriendsOpen,
  onSettingsOpen,
  onSettingsClose,
  onFriendsOpen,
  onFriendsClose,
  user
}: CurrentProfilePresentationProps) {
  const { pendingRequests } = useFriendRequestsContext();

  if (isLoading) {
    return <CurrentProfileSkeleton />;
  }

  if (!profile) {
    return null;
  }

  return (
    <>
      <div 
        className="p-2 flex items-center justify-between w-full shadow-lg border-[1px] border-[#2B2B2B] rounded-sm"
        style={{ backgroundColor: themeColor }}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {profile.avatarKey ? (
              <ProfileImage
                path={profile.avatarKey}
                alt={profile.name}
                fallbackText={profile.name.charAt(0).toUpperCase()}
                width={32}
                height={32}
                className="rounded-full"
                themeColor={themeColor}
              />
            ) : (
              <AvatarFallback className='bg-zinc-700 text-zinc-100 text-xs'>
                {profile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm font-medium text-white">
            {profile.name}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onFriendsOpen}
            className="p-1 rounded-full hover:bg-black/20 transition-colors relative"
          >
            <Image
              src="/friends.svg"
              alt="Friends"
              width={20}
              height={20}
              className="opacity-80"
            />
            {pendingRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </button>
          <button 
            onClick={onSettingsOpen}
            className="p-1 rounded-full hover:bg-black/20 transition-colors"
          >
            <Image
              src="/settings.svg"
              alt="Settings"
              width={20}
              height={20}
              className="opacity-80"
            />
          </button>
        </div>
      </div>

      <SettingsContainer
        isOpen={isSettingsOpen}
        onClose={onSettingsClose}
        profile={profile}
        user={user}
      />

      <FriendsContainer
        isOpen={isFriendsOpen}
        onClose={onFriendsClose}
        userId={user?.userId || ''}
        username={user?.username || ''}
        profileId={profile.profileId}
        initialRequests={pendingRequests}
      />
    </>
  );
}