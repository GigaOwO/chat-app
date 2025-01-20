import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from 'aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/_lib/amplify/amplifyServerContext'
import { cookies } from 'next/headers'

// 認証が必要なパス
const AUTH_PATHS = ['/dm']
// 未認証ユーザーのみがアクセスできるパス
const PUBLIC_PATHS = ['/signin', '/signup']

export async function middleware(request: NextRequest) {
  try {
    // 現在のパスを取得
    const path = request.nextUrl.pathname

    // AmplifyServerContextを使用して現在のユーザーを取得
    const user = await runWithAmplifyServerContext({
      nextServerContext: {
        cookies: () => cookies(),
      },
      operation: async (contextSpec) => {
        try {
          return await getCurrentUser(contextSpec)
        } catch {
          return null
        }
      },
    })

    // 認証済みユーザーの場合
    if (user) {
      // 未認証ユーザー専用パスへのアクセスを防ぐ
      if (PUBLIC_PATHS.some(p => path.startsWith(p))) {
        return NextResponse.redirect(new URL('/dm', request.url))
      }
    } 
    // 未認証ユーザーの場合
    else {
      // 認証が必要なパスへのアクセスを防ぐ
      if (AUTH_PATHS.some(p => path.startsWith(p))) {
        return NextResponse.redirect(new URL('/signin', request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

// ミドルウェアを適用するパスを設定
export const config = {
  matcher: ['/dm', '/signin', '/signup']
}