import getCookieUseCase from "@/_lib/cookie/getCookieUseCase";
import { setCookieUseCase } from "@/_lib/cookie/setCookieUseCase";
import { useState } from "react";

export function useCookie() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setCookie = async (name:string, value:string, maxAge:number) => {
    setLoading(true);
    setError(null);
    try {
      return await setCookieUseCase({ name, value, maxAge });
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  const getCookie = async (name:string) => {
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
  }
  return {
    setCookie,
    getCookie,
    loading,
    error,
  }
}