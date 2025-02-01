'use client'

import { Avatar, AvatarFallback } from '@/_components/ui/avatar'
import { useProfileContext } from './ProfileContext'
import { ProfileSwitcherSkeleton } from './Skeletons'
import Image from 'next/image'

export function ProfileSwitcher() {
  const { otherProfiles, isLoading, switchProfile, getThemeColorById } = useProfileContext()

  if (isLoading) {
    return <ProfileSwitcherSkeleton />
  }

  if (otherProfiles.length === 0) {
    return null
  }

  return (
    <div className="flex gap-2">
      {otherProfiles.map((profile) => {
        const themeColor = getThemeColorById(profile.profileId)
        
        return (
          <button
            key={profile.profileId}
            onClick={() => switchProfile(profile.profileId)}
            className="group relative flex gap-2 items-center justify-center h-12 w-12 rounded-lg"
            style={{ backgroundColor: themeColor }}
          >
            <Avatar className="h-6 w-6">
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
          </button>
        )
      })}
    </div>
  )
}