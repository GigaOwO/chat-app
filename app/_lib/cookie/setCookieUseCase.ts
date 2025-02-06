"use server"

import { SetCookie } from "@/(aurora)/_types";
import { cookies } from "next/headers";

/**
 * クッキーをセットする関数
 * @param name セットする時の名前
 * @param value セットする値
 * @param maxAge クッキーの有効期限
 */
export async function setCookieUseCase({ name, value, maxAge }:SetCookie): Promise<boolean> {
  try {
    const cookie = await cookies();
    cookie.set({
      name,
      value,
      maxAge,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    })
    return true;
  } catch {
    return false;
  }
}