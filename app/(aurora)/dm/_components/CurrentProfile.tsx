'use client'

import { useEffect, useState } from 'react'
import { useProfiles } from '@/(aurora)/_hooks/Profiles/useProfiles'
import { getCurrentUser } from 'aws-amplify/auth'
import { Avatar, AvatarFallback } from '@/_components/ui/avatar'
import type { Profiles } from '@/_lib/graphql/API'

export function CurrentProfile() {
  const [profile, setProfile] = useState<Profiles | null>(null)
  const [loading, setLoading] = useState(true)
  const { fetchProfilesByUserId } = useProfiles()

  useEffect(() => {
    const fetchCurrentProfile = async () => {
      try {
        const { userId } = await getCurrentUser()
        const profiles = await fetchProfilesByUserId(userId)
        
        if (profiles?.items && profiles.items.length > 0) {
          // Get the first profile (assuming one user has one profile for now)
          setProfile(profiles.items[0])
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentProfile()
  }, [fetchProfilesByUserId])

  if (loading) {
    return null // or loading spinner
  }

  if (!profile) {
    return (
      <div className="p-3 flex items-center gap-3 w-full bg-zinc-900 shadow-lg">
        <Avatar>
          <AvatarFallback className="bg-zinc-700 text-zinc-100">?</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-zinc-100">Loading...</span>
      </div>
    )
  }

  return (
    <div className="p-3 flex items-center gap-3 w-full bg-zinc-900 shadow-lg">
      <Avatar>
        {profile.avatarKey ? (
          <img 
            src={profile.avatarKey} 
            alt={profile.name} 
            className="h-full w-full object-cover"
          />
        ) : (
          <AvatarFallback className="bg-zinc-700 text-zinc-100">
            {profile.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      <span className="text-sm font-medium text-zinc-100">
        {profile.name}
      </span>
    </div>
  )
}