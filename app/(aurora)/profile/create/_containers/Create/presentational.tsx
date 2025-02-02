'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ThemeColorPicker } from '@/(aurora)/_containers/ThemeColors';
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { Label } from '@/_components/ui/label';
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
    imagePreview: null,
    name: '',
    order: 0,
    bio: '',
    themeColor: '1D282E'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result?.toString().slice(0, 10) !== 'data:image') {
        return;
      }
      setFormData(prev => ({
        ...prev,
        imagePreview: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData);
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
          <div className="md:items-center flex flex-col">
            {formData.imagePreview ? (
              <Image
                src={formData.imagePreview}
                alt="プロフィール画像プレビュー"
                width={175}
                height={175}
                className="rounded-full"
              />
            ) : (
              <div className="w-60 h-60 md:w-[175px] md:h-[175px] bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500">画像プレビュー</span>
              </div>
            )}
          </div>

          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full md:w-44 md:mx-auto"
          >
            画像を選択
          </Button>
        </div>
      </div>

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