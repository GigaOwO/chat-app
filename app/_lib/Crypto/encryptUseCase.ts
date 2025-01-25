"use server"

import { CryptoConfig } from "./CryptoConfig"
import CryptoJS from "crypto-js";

export async function encryptUseCase(value: string): Promise<string|undefined> {
  try {
    const cipher = CryptoJS.AES.encrypt(value,CryptoConfig.key).toString();
    return cipher;
  } catch {
    return undefined;
  }
}