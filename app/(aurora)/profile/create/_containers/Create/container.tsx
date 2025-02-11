'use client';

import { useProfiles } from '@/_lib/hooks/useProfiles';
import { CreateProfilePresentation } from './presentational';
import { useRouter } from 'next/navigation';
import type { ProfileFormData } from './types';

interface CreateProfileContainerProps {
  userId: string;
}

export function CreateProfileContainer({ userId }: CreateProfileContainerProps) {
  const router = useRouter();
  const { addProfile, fetchProfilesByUserId, loading } = useProfiles();

  const handleSubmit = async (formData: ProfileFormData) => {
    try {
      // 既存のプロフィールを取得
      const existingProfiles = await fetchProfilesByUserId(userId);
      
      // 最大のorderを見つける
      const maxOrder = existingProfiles?.items
        ?.filter(p => p !== null)
        .reduce((max, profile) => Math.max(max, profile!.order), -1) ?? -1;
      
      const customData = JSON.stringify({ themeColor: formData.themeColor });
      
      await addProfile({
        profileId: `${userId}-${Date.now()}`,
        userId,
        name: formData.name,
        order: maxOrder + 1,
        bio: formData.bio || null,
        avatarKey: formData.avatarKey,
        customData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      router.push('/profile/select');
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  return (
    <CreateProfilePresentation
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
}