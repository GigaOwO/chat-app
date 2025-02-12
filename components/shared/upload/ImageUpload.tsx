'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useStorage } from '@/features/storage/hooks/useStorage';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface ImageUploadProps {
  onUploadComplete: (imagePath: string) => void;
  onUploadError: (error: Error) => void;
}

export default function ImageUpload({ 
  onUploadComplete,
  onUploadError 
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { uploadProfileImage, loading, progress, error } = useStorage();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    try {
      const path = await uploadProfileImage(file);
      onUploadComplete(path);
    } catch (err) {
      onUploadError(err as Error);
    }
  };

  return (
    <div className="space-y-4">
      {previewUrl && (
        <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden">
          <Image
            src={previewUrl}
            alt="Preview"
            className="object-cover"
            fill
            sizes="128px"
            priority
          />
        </div>
      )}

      <div className="space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="w-full text-gray5"
        >
          {loading ? 'アップロード中...' : '画像を選択'}
        </Button>

        {loading && (
          <Progress value={progress} className="h-2" />
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            アップロードに失敗しました: {error.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
