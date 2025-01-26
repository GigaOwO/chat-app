"use server"

import { cookies } from "next/headers";

/**
 *クッキーを取得する関数
 * @param name
 * @returns その名前のクッキーの値を返す。ない場合はnullを返す。
 */
export default async function getCookieUseCase(name:string):Promise<string | null> {
  try {
    const cookie_store = await cookies();
    const cookie = cookie_store.get(name);
    return cookie!.value;
  } catch {
    return null;
  }
}