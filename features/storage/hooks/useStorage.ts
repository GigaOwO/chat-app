import { useState, useCallback } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

export function useStorage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const uploadProfileImage = useCallback(async (file: File) => {
    setLoading(true);
    setProgress(0);
    setError(null);

    try {
      const fileKey = `profile-images/${uuidv4()}-${file.name}`;
      
      await uploadData({
        key: fileKey,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              const percentCompleted = Math.round((transferredBytes / totalBytes) * 100);
              setProgress(percentCompleted);
            }
          },
        },
      });

      return fileKey;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    uploadProfileImage,
    loading,
    progress,
    error,
  };
}
