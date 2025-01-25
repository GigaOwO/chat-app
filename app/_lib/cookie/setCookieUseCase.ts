"use server"

import { SetCookie } from "@/(aurora)/_types";
import { cookies } from "next/headers";

export async function setCookieUseCase({ name, value, maxAge }:SetCookie): Promise<void|undefined> {
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
  } catch {
    return undefined;
  }
}