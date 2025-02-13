'use client';

import { Alert, AlertDescription } from '@/_components/ui/alert';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { ThemeColorPicker } from '../../ThemeColors/picker';
import ImageUpload from '@/_components/ImageUpload';
import type { DeleteProfilesInput, Profiles } from '@/_lib/graphql/API';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import { getThemeColorFromCustomData } from '@/_lib/utils/theme';
import { ArrowLeft, Plus } from 'lucide-react';
import { ProfileImage } from '@/_components/ProfileImage';
import { setCookieUseCase } from '@/_lib/cookie/setCookieUseCase';

interface ProfileTabPresentationProps {
  profiles: Profiles[];
  selectedProfile: Profiles | null;
  isCreating: boolean;
  onProfileSelect: (profile: Profiles) => void;
  onBackToList: () => void;
  onProfileSubmit: (formData: {
    name: string;
    bio: string;
    themeColor: string;
    avatarKey: string | null;
  }) => Promise<void>;
  onCreateProfile: (formData: {
    name: string;
    bio: string;
    themeColor: string;
    avatarKey: string | null;
  }) => Promise<void>;
  onCreateNew: () => void;
  onDeleteProfile: (input: DeleteProfilesInput) => Promise<Profiles|null>;
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
  isCreating,
  onProfileSelect,
  onBackToList,
  onProfileSubmit,
  onCreateProfile,
  onCreateNew,
  onDeleteProfile,
  isLoading
}: ProfileTabPresentationProps) {
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
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
    } else if (!isCreating) {
      setFormState({
        name: '',
        bio: '',
        avatarKey: null,
        themeColor: '1D282E'
      });
    }
  }, [selectedProfile, isCreating]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (isCreating) {
        await onCreateProfile(formState);
      } else {
        await onProfileSubmit(formState);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    }
  };

  const handleDeleteModal = async () => {
    setIsDeleteModal(true);
  }

  const handleDelete = async () => {
    setError(null);
    try {
      if (selectedProfile) {
        const deletedProfile = await onDeleteProfile({
          profileId: selectedProfile.profileId,
          userId: selectedProfile.userId
        });
        await setCookieUseCase({name:'profileId', value:'', maxAge:0});
        if (deletedProfile) {
          onBackToList();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    }
  }

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

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 text-white1">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onBackToList}
          className="text-white1"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-xl font-medium text-white1">
          {isCreating ? 'プロフィールを作成' : 'プロフィールを編集'}
        </h3>
      </div>

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
              className="w-full bg-gray5 text-white1"
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
              className="w-full bg-gray5 text-white1"
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
      <div className="flex space-x-4">
        <Button 
          type="submit" 
          disabled={isLoading} 
          className='bg-gray2 hover:bg-gray3 text-white1'
        >
          {isLoading ? '保存中...' : isCreating ? '作成' : '保存'}
        </Button>
        {selectedProfile && (
          <Button 
            type="button" 
            onClick={handleDeleteModal}
            className='bg-red-700 hover:bg-red-800 text-white1'
          >
            削除
          </Button>
        )}
      </div>
    </form>
  );

  if(isDeleteModal){
    return (
      <div className="w-full h-2/3 flex flex-col justify-center items-center">
        <h3 className="text-xl font-bold text-white1">プロフィールを削除</h3>
        <p className="text-gray-300 mt-2">本当に削除しますか？</p>
        <div className="flex justify-end mt-6 space-x-4">
          <Button 
            onClick={handleDelete}
            className="bg-red-700 hover:bg-red-800 text-white1"
          >
            削除
          </Button>
          <Button 
            onClick={() => setIsDeleteModal(false)}
            className="bg-gray2 hover:bg-gray3 text-white1"
          >
            キャンセル
          </Button>
        </div>
      </div>
    );
  }

  if (selectedProfile || isCreating) {
    return renderForm();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray1 pb-2">
        <h3 className="text-xl font-medium text-white1">プロフィール</h3>
        <Button
          onClick={onCreateNew}
          className="bg-gray2 hover:bg-gray3 text-white1"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          新規作成
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {profiles.map((profile) => {
          const themeColor = getThemeColorFromCustomData(profile);
          
          return (
            <button
              key={profile.profileId}
              onClick={() => onProfileSelect(profile)}
              className="flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-gray3"
              style={{ backgroundColor: themeColor }}
            >
              <Avatar className="h-10 w-10">
                {profile.avatarKey ? (
                  <ProfileImage
                    path={profile.avatarKey}
                    alt={profile.name}
                    fallbackText={profile.name.charAt(0).toUpperCase()}
                    width={40}
                    height={40}
                    className="rounded-full"
                    themeColor={themeColor}
                  />
                ) : (
                  <AvatarFallback className="bg-zinc-700 text-zinc-100 text-xs">
                    {profile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-left">
                <h4 className="font-medium text-white1">{profile.name}</h4>
                {profile.bio && (
                  <p className="text-sm text-gray-300 truncate">{profile.bio}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}