'use client';

import { useEffect, useState } from 'react';
import { AvatarFallback } from '@/_components/ui/avatar';
import Image from 'next/image';
import { useStorage } from '@/_lib/hooks/useStorage';

interface ProfileImageProps {
  path: string | null | undefined;
  alt: string;
  fallbackText: string;
  width: number;
  height: number;
  className?: string;
  fallbackClassName?: string;
  themeColor?: string;
}

export function ProfileImage({
  path,
  alt,
  fallbackText,
  width,
  height,
  className = '',
  fallbackClassName = '',
  themeColor
}: ProfileImageProps) {
  const [url, setUrl] = useState<string | null>(null);
  const { getPresignedUrl, loading } = useStorage();

  useEffect(() => {
    const fetchUrl = async () => {
      if (!path) return;

      try {
        const presignedUrl = await getPresignedUrl(path);
        // presignedUrlが有効なURLであることを確認
        if (presignedUrl && (presignedUrl.startsWith('http://') || presignedUrl.startsWith('https://'))) {
          setUrl(presignedUrl);
        } else {
          console.error('Invalid URL format received:', presignedUrl);
          setUrl(null);
        }
      } catch (error) {
        console.error('Error getting presigned URL:', error);
        setUrl(null);
      }
    };

    fetchUrl();
  }, [path, getPresignedUrl]);

  if (loading || !url) {
    return (
      <AvatarFallback 
        className={`${fallbackClassName} ${loading ? 'animate-pulse' : ''}`}
        style={themeColor ? { backgroundColor: themeColor } : undefined}
      >
        {fallbackText}
      </AvatarFallback>
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}