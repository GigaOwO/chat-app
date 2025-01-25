import decryptUseCase from "@/_lib/Crypto/decryptUseCase";
import { encryptUseCase } from "@/_lib/Crypto/encryptUseCase";
import { useState } from "react";

export function useCrypto(){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = async (value:string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await encryptUseCase(value);
      return res;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  const decrypt = async (value:string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await decryptUseCase(value);
      return res;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    encrypt,
    decrypt,
    loading,
    error,
  }
}