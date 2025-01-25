"use server"

import { cookies } from "next/headers";

export default async function getCookieUseCase(name:string):Promise<string | null> {
  try {
    const cookie_store = await cookies();
    const cookie = cookie_store.get(name);
    return cookie!.value;
  } catch {
    return null;
  }
}