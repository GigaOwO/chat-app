"use server"

import CryptoJS from 'crypto-js';
import { CryptoConfig } from './CryptoConfig';

/**
 * 復号化をする関数
 * @param value 復号化したい値
 * @returns 復号化された値
 * @returns 復号化に失敗した場合はundefinedを返す
 */
export default async function decryptUseCase(value:string): Promise<string|undefined> {
  try {
    const bytes = CryptoJS.AES.decrypt(value, CryptoConfig.key);
    const plain = bytes.toString(CryptoJS.enc.Utf8);
    return plain;
  }catch {
    return undefined;
  }
}