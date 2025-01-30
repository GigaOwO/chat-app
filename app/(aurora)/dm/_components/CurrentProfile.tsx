'use client'

import { Avatar, AvatarFallback } from '@/_components/ui/avatar'
import { useProfileContext } from './ProfileContext'
import { CurrentProfileSkeleton } from './Skeletons'
import Image from 'next/image'

export function CurrentProfile() {
  const { currentProfile, isLoading } = useProfileContext()

  if (isLoading) {
    return <CurrentProfileSkeleton />
  }

  if (!currentProfile) {
    return (
      <div className="p-3 flex items-center gap-3 w-full bg-zinc-900 shadow-lg">
        <Avatar>
          <AvatarFallback className="bg-zinc-700 text-zinc-100">?</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-zinc-100">No profile found</span>
      </div>
    )
  }
  return (
    <div className="p-2 flex items-center gap-3 w-full bg-[#1D282E] shadow-lg border-[1px] border-[#2B2B2B] rounded-sm">
      <Avatar>
        {currentProfile.avatarKey ? (
          <Image 
            src={currentProfile.avatarKey} 
            alt={currentProfile.name} 
            className="h-full w-full object-cover"
            width={30}
            height={30}
          />
        ) : (
          <AvatarFallback className="bg-zinc-700 text-zinc-50">
            {currentProfile.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      <span className="text-sm font-medium text-zinc-100">
        {currentProfile.name}
      </span>
    </div>
  )
}