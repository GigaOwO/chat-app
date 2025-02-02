'use client';

import { Alert, AlertDescription } from '@/_components/ui/alert';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { ThemeColorPicker } from '../../ThemeColors/picker';
import ImageUpload from '@/_components/ImageUpload';
import type { Profiles } from '@/_lib/graphql/API';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import { getThemeColorFromCustomData } from '@/_lib/utils/theme';
import { ArrowLeft } from 'lucide-react';
import { ProfileImage } from '@/_components/ProfileImage';

interface ProfileTabPresentationProps {
  profiles: Profiles[];
  selectedProfile: Profiles | null;
  onProfileSelect: (profile: Profiles) => void;
  onBackToList: () => void;
  onProfileSubmit: (formData: {
    name: string;
    bio: string;
    themeColor: string;
    avatarKey: string | null;
  }) => Promise<void>;
  isLoading: boolean;
}

interface FormState {
  name: string;
  bio: string;
  avatarKey: string | null;
  themeColor: string;
}

export function ProfileTabPresentation({
  profiles,
  selectedProfile,
  onProfileSelect,
  onBackToList,
  onProfileSubmit,
  isLoading
}: ProfileTabPresentationProps) {
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>({
    name: '',
    bio: '',
    avatarKey: null,
    themeColor: '1D282E'
  });

  useEffect(() => {
    if (selectedProfile) {
      let themeColor = '1D282E';
      try {
        if (selectedProfile.customData) {
          const customData = JSON.parse(selectedProfile.customData);
          themeColor = customData.themeColor || '1D282E';
        }
      } catch (error) {
        console.error('Error parsing customData:', error);
      }

      setFormState({
        name: selectedProfile.name,
        bio: selectedProfile.bio || '',
        avatarKey: selectedProfile.avatarKey || null,
        themeColor: themeColor
      });
    }
  }, [selectedProfile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    try {
      await onProfileSubmit(formState);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    }
  };

  const handleImageUpload = (path: string) => {
    setFormState(prev => ({
      ...prev,
      avatarKey: path
    }));
  };

  const handleImageUploadError = (error: Error) => {
    setError(`画像のアップロードに失敗しました: ${error.message}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (selectedProfile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackToList}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium">プロフィールを編集</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="md:flex md:gap-8">
            <div className="md:flex-1 space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  名前
                </label>
                <Input
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  自己紹介
                </label>
                <Input
                  id="bio"
                  value={formState.bio}
                  onChange={(e) => setFormState(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full"
                />
              </div>

              <ThemeColorPicker
                selectedColor={formState.themeColor}
                onColorSelect={(color) => setFormState(prev => ({ ...prev, themeColor: color }))}
              />
            </div>

            <div className="mt-6 md:mt-0 md:w-64">
              <ImageUpload
                onUploadComplete={handleImageUpload}
                onUploadError={handleImageUploadError}
              />
              {formState.avatarKey && (
                <div className="mt-4">
                  <Avatar className="h-32 w-32">
                    <ProfileImage
                      path={formState.avatarKey}
                      alt={formState.name}
                      fallbackText={formState.name.charAt(0).toUpperCase()}
                      width={128}
                      height={128}
                      className="rounded-full"
                      themeColor={formState.themeColor}
                    />
                  </Avatar>
                </div>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? '保存中...' : '保存'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">編集するプロフィールを選択</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {profiles.map((profile) => {
        const themeColor = getThemeColorFromCustomData(profile);
        
        return (
          <button
            key={profile.profileId}
            onClick={() => onProfileSelect(profile)}
            className="flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-gray-50"
            style={{ backgroundColor: themeColor + '20' }}
          >
            <Avatar className="h-12 w-12">
              {profile.avatarKey ? (
                <ProfileImage
                  path={profile.avatarKey}
                  alt={profile.name}
                  fallbackText={profile.name.charAt(0).toUpperCase()}
                  width={48}
                  height={48}
                  className="rounded-full"
                  themeColor={themeColor}
                />
              ) : (
                <AvatarFallback
                  className="text-lg"
                  style={{ backgroundColor: themeColor }}
                >
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-left">
              <h4 className="font-medium">{profile.name}</h4>
              {profile.bio && (
                <p className="text-sm text-gray-500 truncate">
                  {profile.bio}
                </p>
              )}
            </div>
          </button>
        );
      })}
      </div>
    </div>
  );
}