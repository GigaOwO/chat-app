import { useCallback, useMemo, useState } from "react";
import { encryptUseCase } from "@/_lib/Crypto/encryptUseCase";
import decryptUseCase from "@/_lib/Crypto/decryptUseCase";

/**
 * 暗号化のロジックをまとめたカスタムフック
 * @returns 暗号化のロジック
 * @returns loading 処理中かどうか
 * @returns error エラー内容
 * @returns encrypt 暗号化する関数
 * @returns decrypt 復号化する関数
 */
export function useCrypto() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * 暗号化
   * @param value 暗号化したい値
   * @returns 暗号化された値もしくはnull
   */
  const encrypt = useCallback(async (value: string) => {
    setLoading(true);
    setError(null);
    try {
      return await encryptUseCase(value);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 復号化
   * @param value 復号化したい値
   * @returns 復号化された値もしくはnull
   */
  const decrypt = useCallback(async (value: string) => {
    setLoading(true);
    setError(null);
    try {
      return await decryptUseCase(value);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return useMemo(() => ({
    encrypt,
    decrypt,
    loading,
    error,
  }), [encrypt, decrypt, loading, error]);
}