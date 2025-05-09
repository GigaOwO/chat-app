import { useCallback, useMemo, useState } from "react";
import getCookieUseCase from "@/_lib/cookie/getCookieUseCase";
import { setCookieUseCase } from "@/_lib/cookie/setCookieUseCase";
import { SetCookie } from "@/(aurora)/_types";

/**
 * クッキーのロジックをまとめたカスタムフック
 * @returns クッキーのロジック
 * @returns loading 処理中かどうか
 * @returns error エラー内容
 * @returns setCookie クッキーをセットする関数
 * @returns getCookie クッキーを取得する関数
 */
export function useCookie() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * クッキーをセットする
   * @param name セットする時の名前
   * @param value セットする値
   * @param maxAge クッキーの有効期限
   * @returns セットに成功した場合はtrue、失敗した場合はfalse
   */
  const setCookie = useCallback(async ({ name, value, maxAge }: SetCookie) => {
    setLoading(true);
    setError(null);
    try {
      return await setCookieUseCase({ name, value, maxAge });
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * クッキーを取得する
   * @param name 取得したいクッキーの名前
   * @returns クッキーの値もしくはnull
   */
  const getCookie = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      return await getCookieUseCase(name);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return useMemo(() => ({
    setCookie,
    getCookie,
    loading,
    error,
  }), [setCookie, getCookie, loading, error]);
}