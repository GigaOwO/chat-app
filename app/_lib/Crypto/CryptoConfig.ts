type CryptoConfig = {
  key: string;
}

/**
 * 暗号化に関するconfig
 * @param key 暗号化に使うキー
 */
export const CryptoConfig:CryptoConfig = {
  key: process.env.CRYPTO_SECRET_KEY!,
}