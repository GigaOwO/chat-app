'use client';

import { useState } from 'react';
import { uploadData, getUrl } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';

export function useStorage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);

  const generateUniqueFileName = (originalName: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    return `${timestamp}-${random}.${extension}`;
  };

  const uploadProfileImage = async (file: File): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const { userId } = await getCurrentUser();
      const fileName = generateUniqueFileName(file.name);
      const path = `private/profiles/${userId}/${fileName}`;
      
      const reader = new FileReader();
      
      // アップロード処理
      await new Promise((resolve, reject) => {
        reader.onload = async (event) => {
          if (!event.target?.result) {
            reject(new Error('Failed to read file'));
            return;
          }

          try {
            await uploadData({
              data: event.target.result,
              path,
              options: {
                contentType: file.type,
                onProgress: ({ transferredBytes, totalBytes }) => {
                  if (totalBytes) {
                    const progressPercent = Math.round(
                      (transferredBytes / totalBytes) * 100
                    );
                    setProgress(progressPercent);
                  }
                },
              },
            }).result;
            resolve(path);
          } catch (err) {
            reject(err);
          }
        };
        
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
      });

      // 署名付きURLを取得
      const { url } = await getUrl({
        path,
        options: {
          expiresIn: 3600 * 24, // 24時間の有効期限
          validateObjectExistence: true,
        }
      });

      return url.toString();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return {
    loading,
    progress,
    error,
    uploadProfileImage
  };
}