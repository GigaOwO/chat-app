'use client';

import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import Image from 'next/image';
import type { Profiles } from '@/_lib/graphql/API';
import { SettingsContainer } from '../Settings/container';
import { CurrentProfileSkeleton } from './skeleton';
import { ProfileImage } from '@/_components/ProfileImage';

interface CurrentProfilePresentationProps {
  profile: Profiles | null;
  isLoading: boolean;
  themeColor: string;
  isSettingsOpen: boolean;
  onSettingsOpen: () => void;
  onSettingsClose: () => void;
}

export function CurrentProfilePresentation({
  profile,
  isLoading,
  themeColor,
  isSettingsOpen,
  onSettingsOpen,
  onSettingsClose
}: CurrentProfilePresentationProps) {
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

      <SettingsContainer
        isOpen={isSettingsOpen}
        onClose={onSettingsClose}
        profile={profile}
      />
    </>
  );
}