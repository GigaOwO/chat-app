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
  const { addProfile, loading } = useProfiles();

  const handleSubmit = async (formData: ProfileFormData) => {
    const customData = JSON.stringify({ themeColor: formData.themeColor });
    
    await addProfile({
      profileId: `${userId}-${Date.now()}`,
      userId,
      name: formData.name,
      order: formData.order,
      bio: formData.bio || null,
      avatarKey: formData.avatarKey,
      customData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    router.push('/profile/select');
  };

  return (
    <CreateProfilePresentation
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
}