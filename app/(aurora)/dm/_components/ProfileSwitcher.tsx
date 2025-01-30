'use client'

import { Avatar, AvatarFallback } from '@/_components/ui/avatar'
import { useProfileContext } from './ProfileContext'
import { ProfileSwitcherSkeleton } from './Skeletons'
import Image from 'next/image'

export function ProfileSwitcher() {
  const { otherProfiles, isLoading, switchProfile } = useProfileContext()

  if (isLoading) {
    return <ProfileSwitcherSkeleton />
  }

  if (otherProfiles.length === 0) {
    return null
  }

  return (
    <div className="max-w-[240px] overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
      <div className="flex gap-2 min-w-fit pb-2">
        {otherProfiles.map((profile) => (
          <button
            key={profile.profileId}
            onClick={() => switchProfile(profile.profileId)}
            className="group relative flex-shrink-0 flex gap-2 items-center justify-center bg-[#222B26] h-12 w-12 rounded-lg"
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
        ))}
      </div>
    </div>
  )
}