"use server"

import CryptoJS from 'crypto-js';
import { CryptoConfig } from './CryptoConfig';

export default async function decryptUseCase(value:string): Promise<string|undefined> {
  try {
    const bytes = CryptoJS.AES.decrypt(value, CryptoConfig.key);
    const plain = bytes.toString(CryptoJS.enc.Utf8);
    return plain;
  }catch {
    return undefined;
  }
}