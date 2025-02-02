'use client';

import { useState } from 'react';
import { ThemeColorPicker } from '@/(aurora)/_containers/ThemeColors';
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { Label } from '@/_components/ui/label';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import ImageUpload from '@/_components/ImageUpload';
import type { ProfileFormData } from './types';

interface CreateProfilePresentationProps {
  loading: boolean;
  onSubmit: (data: ProfileFormData) => Promise<void>;
}

export function CreateProfilePresentation({
  loading,
  onSubmit
}: CreateProfilePresentationProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    avatarKey: null,
    name: '',
    order: 0,
    bio: '',
    themeColor: '1D282E'
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    }
  };

  const updateFormData = <K extends keyof ProfileFormData>(
    field: K,
    value: ProfileFormData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUploadComplete = (imagePath: string) => {
    updateFormData('avatarKey', imagePath);
  };

  const handleUploadError = (error: Error) => {
    setError(`画像のアップロードに失敗しました: ${error.message}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black w-[360px] md:w-[675px] rounded-md border border-neutral-800 shadow-lg p-10 md:p-12"
    >
      <div className="md:flex md:justify-between">
        <div className="mb-5 md:mb-0 space-y-3 md:space-y-5">
          <div className="flex flex-col">
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              type="text"
              required
              placeholder="名前を入力"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className="mt-1 w-96"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="order">表示順</Label>
            <Input
              id="order"
              type="number"
              placeholder="表示順を入力"
              value={formData.order}
              onChange={(e) => updateFormData('order', Number(e.target.value))}
              className="mt-1 w-96"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="bio">自己紹介</Label>
            <Input
              id="bio"
              type="text"
              placeholder="自己紹介を入力"
              value={formData.bio}
              onChange={(e) => updateFormData('bio', e.target.value)}
              className="mt-1 w-96"
            />
          </div>

          <ThemeColorPicker
            selectedColor={formData.themeColor}
            onColorSelect={(color) => updateFormData('themeColor', color)}
          />
        </div>

        <div className="flex flex-col gap-5">
          <ImageUpload
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-6">
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-44"
        >
          {loading ? '作成中...' : 'プロフィールを作成'}
        </Button>
      </div>
    </form>
  );
}