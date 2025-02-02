'use client';

import { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';

export function useStorage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);

  const uploadProfileImage = async (file: File): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const { userId } = await getCurrentUser();
      const fileExtension = file.name.split('.').pop();
      const fileName = `profiles/${userId}/${Date.now()}.${fileExtension}`;
      
      const reader = new FileReader();
      
      const uploadResult = await new Promise((resolve, reject) => {
        reader.onload = async (event) => {
          if (!event.target?.result) {
            reject(new Error('Failed to read file'));
            return;
          }

          try {
            const result = await uploadData({
              data: event.target.result,
              path: fileName,
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
            resolve(result.path);
          } catch (err) {
            reject(err);
          }
        };
        
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
      });

      return uploadResult as string;
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