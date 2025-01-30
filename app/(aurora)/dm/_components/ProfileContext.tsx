'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useProfiles } from '@/(aurora)/_hooks/Profiles/useProfiles'
import { useCookie } from '@/(aurora)/_hooks/cookie/useCookie'
import { useCrypto } from '@/(aurora)/_hooks/Crypto/useCrypto'
import type { Profiles } from '@/_lib/graphql/API'
import { getCurrentUser } from 'aws-amplify/auth'

type ProfileContextType = {
  currentProfile: Profiles | null
  otherProfiles: Profiles[]
  isLoading: boolean
  switchProfile: (profileId: string) => Promise<void>
}

const ProfileContext = createContext<ProfileContextType | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [currentProfile, setCurrentProfile] = useState<Profiles | null>(null)
  const [otherProfiles, setOtherProfiles] = useState<Profiles[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [allProfiles, setAllProfiles] = useState<Profiles[]>([])
  
  const { getCookie, setCookie } = useCookie()
  const { decrypt, encrypt } = useCrypto()
  const { fetchProfilesByUserId } = useProfiles()

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const { userId } = await getCurrentUser()
        const profilesResponse = await fetchProfilesByUserId(userId)
        
        if (profilesResponse?.items) {
          const profiles = profilesResponse.items
            .filter((p): p is Profiles => p !== null)
            .sort((a, b) => a.order - b.order)
          
          setAllProfiles(profiles)
        }
      } catch (error) {
        console.error('Error loading profiles:', error)
      }
    }

    loadProfiles()
  }, [fetchProfilesByUserId])

  useEffect(() => {
    const updateCurrentProfile = async () => {
      try {
        setIsLoading(true)
        const encryptedProfileId = await getCookie('profileId')
        const currentProfileId = encryptedProfileId ? await decrypt(encryptedProfileId) : null

        const current = allProfiles.find(p => p.profileId === currentProfileId) || allProfiles[0] || null
        const others = allProfiles.filter(p => p.profileId !== current?.profileId)

        setCurrentProfile(current)
        setOtherProfiles(others)
      } catch (error) {
        console.error('Error updating current profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (allProfiles.length > 0) {
      updateCurrentProfile()
    }
  }, [allProfiles, decrypt, getCookie])

  const switchProfile = async (profileId: string) => {
    try {
      setIsLoading(true)
      const encryptedProfileId = await encrypt(profileId)
      if (encryptedProfileId) {
        await setCookie({ 
          name: 'profileId', 
          value: encryptedProfileId, 
          maxAge: 60 * 60 * 24 * 7 
        })
        
        const newCurrent = allProfiles.find(p => p.profileId === profileId) || null
        const newOthers = allProfiles.filter(p => p.profileId !== profileId)
        
        setCurrentProfile(newCurrent)
        setOtherProfiles(newOthers)
      }
    } catch (error) {
      console.error('Error switching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProfileContext.Provider 
      value={{ 
        currentProfile,
        otherProfiles,
        isLoading,
        switchProfile 
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfileContext() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider')
  }
  return context
}