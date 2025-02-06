'use client';

import { useCookie } from '@/_lib/hooks/useCookie';
import { useCrypto } from '@/_lib/hooks/useCrypto';
import { Profiles } from '@/_lib/graphql/API';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SelectProfilePresentation } from './presentational';

interface SelectProfileContainerProps {
  profiles: Profiles[];
  defaultRedirect?: string;
}

export function SelectProfileContainer({ 
  profiles,
  defaultRedirect = '/dm'
}: SelectProfileContainerProps) {
  const router = useRouter();
  const { encrypt } = useCrypto();
  const { setCookie } = useCookie();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSelectProfile = async (profileId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const encryptedProfileId = await encrypt(profileId);
      if (!encryptedProfileId) {
        throw new Error('プロフィールの暗号化に失敗しました');
      }

      await setCookie({ 
        name: 'profileId', 
        value: encryptedProfileId, 
        maxAge: 60 * 60 * 24 * 7 // 1週間
      });

      router.push(defaultRedirect);
      router.refresh();
    } catch (err) {
      setError('プロフィールの選択中にエラーが発生しました');
      console.error('Error selecting profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SelectProfilePresentation
      profiles={profiles}
      isLoading={isLoading}
      error={error}
      onSelect={handleSelectProfile}
    />
  );
}