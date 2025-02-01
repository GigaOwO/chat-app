'use client';

import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import Image from 'next/image';
import type { Profiles } from '@/_lib/graphql/API';
import { ProfileSwitcherSkeleton } from './skeleton';

interface ProfileSwitcherPresentationProps {
  profiles: Profiles[];
  isLoading: boolean;
  switchingProfileId: string | null;
  getThemeColorById: (profileId: string) => string;
  onProfileSwitch: (profileId: string) => Promise<void>;
}

function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const blendedR = Math.round(r * opacity + 255 * (1 - opacity));
  const blendedG = Math.round(g * opacity + 255 * (1 - opacity));
  const blendedB = Math.round(b * opacity + 255 * (1 - opacity));
  
  return `rgba(${blendedR}, ${blendedG}, ${blendedB}, 0.9)`;
}

export function ProfileSwitcherPresentation({
  profiles,
  isLoading,
  switchingProfileId,
  getThemeColorById,
  onProfileSwitch
}: ProfileSwitcherPresentationProps) {
  if (isLoading) {
    return <ProfileSwitcherSkeleton />;
  }

  if (profiles.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2">
      {profiles.map((profile) => {
        const themeColor = getThemeColorById(profile.profileId);
        const isSwitching = switchingProfileId === profile.profileId;
        const tooltipBgColor = hexToRgba(themeColor, 0.9);
        
        return (
          <button
            key={profile.profileId}
            onClick={() => onProfileSwitch(profile.profileId)}
            className={`
              group relative flex gap-2 items-center justify-center h-12 w-12 rounded-lg
              transition-all duration-300 ease-in-out
              hover:scale-105
              ${isSwitching ? 'animate-pulse' : ''}
            `}
            style={{ backgroundColor: themeColor }}
            disabled={switchingProfileId !== null}
          >
            <div className="transform transition-transform duration-300 group-hover:-rotate-12">
              <Avatar className={`
                h-6 w-6
                transition-all duration-300
                ${isSwitching ? 'animate-spin' : ''}
              `}>
                {profile.avatarKey ? (
                  <Image 
                    src={profile.avatarKey} 
                    alt={profile.name}
                    className="h-full w-full object-cover rounded-full"
                    width={32}
                    height={32}
                  />
                ) : (
                  <AvatarFallback className="bg-zinc-700 text-zinc-100 text-xs">
                    {profile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            
            <div 
              className="absolute -top-8 scale-0 transition-all rounded p-2 text-xs text-white group-hover:scale-100"
              style={{ backgroundColor: tooltipBgColor }}
            >
              {profile.name}
            </div>
          </button>
        );
      })}
    </div>
  );
}