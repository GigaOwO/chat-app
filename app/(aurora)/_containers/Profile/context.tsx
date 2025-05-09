'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import { useCookie } from '@/_lib/hooks/useCookie';
import { useCrypto } from '@/_lib/hooks/useCrypto';
import type { Profiles } from '@/_lib/graphql/API';
import { getCurrentUser } from 'aws-amplify/auth';
import { THEME_COLORS } from '../ThemeColors/constants';
import { generateClient } from 'aws-amplify/api';
import { onCreateProfiles, onUpdateProfiles, onDeleteProfiles } from '@/_lib/graphql/subscriptions';

export interface ProfileContextValue {
  currentProfile: Profiles | null;
  otherProfiles: Profiles[];
  isLoading: boolean;
  isSwitching: boolean;
  switchProfile: (profileId: string) => Promise<void>;
  getCurrentThemeColor: () => string;
  getThemeColorById: (profileId: string) => string;
  refreshProfiles: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

const DEFAULT_THEME_COLOR = THEME_COLORS[0].value;

const getThemeColorFromCustomData = (profile: Profiles | null): string => {
  if (!profile?.customData) return DEFAULT_THEME_COLOR;
  try {
    const customData = JSON.parse(profile.customData);
    const colorId = customData.themeColor;
    const color = THEME_COLORS.find(c => c.id === colorId);
    return color ? color.value : DEFAULT_THEME_COLOR;
  } catch {
    return DEFAULT_THEME_COLOR;
  }
}

const client = generateClient();

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [currentProfile, setCurrentProfile] = useState<Profiles | null>(null);
  const [otherProfiles, setOtherProfiles] = useState<Profiles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allProfiles, setAllProfiles] = useState<Profiles[]>([]);
  const [isSwitching, setIsSwitching] = useState(false);
  
  const { getCookie, setCookie } = useCookie();
  const { decrypt, encrypt } = useCrypto();
  const { fetchProfilesByUserId } = useProfiles();

  const getCurrentThemeColor = () => getThemeColorFromCustomData(currentProfile);
  
  const getThemeColorById = (profileId: string) => {
    const profile = allProfiles.find(p => p.profileId === profileId);
    return getThemeColorFromCustomData(profile || null);
  }

  const loadProfiles = async () => {
    try {
      setIsLoading(true);
      const { userId } = await getCurrentUser();
      
      const profilesResponse = await fetchProfilesByUserId(userId);
      
      if (profilesResponse?.items) {
        const profiles = profilesResponse.items
          .filter((p): p is Profiles => p !== null)
          .sort((a, b) => a.order - b.order);
        
        setAllProfiles(profiles);
        
        const encryptedProfileId = await getCookie('profileId');
        const currentProfileId = encryptedProfileId ? await decrypt(encryptedProfileId) : null;
        
        const current = profiles.find(p => p.profileId === currentProfileId) || profiles[0];
        const others = profiles.filter(p => p.profileId !== current?.profileId);
        
        setCurrentProfile(current);
        setOtherProfiles(others);
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
      setCurrentProfile(null);
      setOtherProfiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 初期ロードとサブスクリプションの設定
  useEffect(() => {
    loadProfiles();

    // サブスクリプションの設定
    const subscriptions = [
      // プロフィール作成の監視
      client.graphql({
        query: onCreateProfiles
      }).subscribe({
        next: async () => {
          await loadProfiles();
        },
        error: (error) => console.error('Subscription error:', error)
      }),

      // プロフィール更新の監視
      client.graphql({
        query: onUpdateProfiles
      }).subscribe({
        next: async () => {
          await loadProfiles();
        },
        error: (error) => console.error('Subscription error:', error)
      }),

      // プロフィール削除の監視
      client.graphql({
        query: onDeleteProfiles
      }).subscribe({
        next: async () => {
          await loadProfiles();
        },
        error: (error) => console.error('Subscription error:', error)
      })
    ];

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, []);

  const switchProfile = async (profileId: string) => {
    setIsSwitching(true);
    try {
      const newCurrent = allProfiles.find(p => p.profileId === profileId) || null;
      const newOthers = allProfiles.filter(p => p.profileId !== profileId);
      
      setCurrentProfile(newCurrent);
      setOtherProfiles(newOthers);

      const encryptedProfileId = await encrypt(profileId);
      if (encryptedProfileId) {
        await setCookie({ 
          name: 'profileId', 
          value: encryptedProfileId, 
          maxAge: 60 * 60 * 24 * 7
        });
      }
    } catch (error) {
      console.error('Error switching profile:', error);
    } finally {
      setIsSwitching(false);
    }
  };

  const refreshProfiles = async () => {
    await loadProfiles();
  };

  const contextValue: ProfileContextValue = {
    currentProfile,
    otherProfiles,
    isLoading,
    isSwitching,
    switchProfile,
    getCurrentThemeColor,
    getThemeColorById,
    refreshProfiles
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
}