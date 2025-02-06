"use server"

import { CryptoConfig } from "./CryptoConfig"
import CryptoJS from "crypto-js";

/**
 * 暗号化する関数
 * @param value 暗号化したい値
 * @returns 暗号化された値
 * @returns 暗号化に失敗した場合はundefinedを返す
 */
export async function encryptUseCase(value: string): Promise<string|undefined> {
  try {
    const cipher = CryptoJS.AES.encrypt(value,CryptoConfig.key).toString();
    return cipher;
  } catch {
    return undefined;
  }
}