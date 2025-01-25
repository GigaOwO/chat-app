type CryptoConfig = {
  key: string;
}

export const CryptoConfig:CryptoConfig = {
  key: process.env.CRYPTO_SECRET_KEY!,
}