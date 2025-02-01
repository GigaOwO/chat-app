"use client";

import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import { useProfileContext } from './ProfileContext';
import { CurrentProfileSkeleton } from './Skeletons';
import Image from 'next/image';
import { useState } from 'react';
import { SettingsModal } from '@/(aurora)/_containers/SettingsModal/presentational';

export function CurrentProfile() {
  const { currentProfile, isLoading, getCurrentThemeColor } = useProfileContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (isLoading) {
    return <CurrentProfileSkeleton />;
  }

  if (!currentProfile) {
    return null;
  }

  const themeColor = getCurrentThemeColor();

  return (
    <>
      <div 
        className="p-2 flex items-center justify-between w-full shadow-lg border-[1px] border-[#2B2B2B] rounded-sm"
        style={{ backgroundColor: themeColor }}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {currentProfile.avatarKey ? (
              <Image
                src={currentProfile.avatarKey}
                alt={currentProfile.name}
                className="h-full w-full object-cover"
                width={32}
                height={32}
              />
            ) : (
              <AvatarFallback>
                {currentProfile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm font-medium text-white">
            {currentProfile.name}
          </span>
        </div>
        
        <button 
          onClick={() => setIsSettingsOpen(true)}
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

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={currentProfile}
      />
    </>
  );
}