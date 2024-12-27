import { SignInForm } from './presentational'
import { headers } from 'next/headers'

export async function SignInContainer() {
  // サーバーサイドの処理
  // 例: CSRFトークンの取得やその他の初期データフェッチ
  const headersList = await headers()
  const csrfToken = headersList.get('X-CSRF-Token')

  return <SignInForm csrfToken={csrfToken} />
}