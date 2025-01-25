import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from 'aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/_lib/amplify/amplifyServerContext'
import { cookies } from 'next/headers'
import decryptUseCase from '@/_lib/Crypto/decryptUseCase'
import { Amplify } from 'aws-amplify'
import { amplifyConfig } from '@/_lib/amplify/amplifyConfig'
import { generateClient } from 'aws-amplify/api'
import { getProfile } from '@/_lib/Featchers/Profiles/featcher'
import { Profiles } from '@/_lib/graphql/API'

Amplify.configure(amplifyConfig, { ssr: true });
// 認証が必要なパス
const AUTH_PATHS = ['/dm']
// 未認証ユーザーのみがアクセスできるパス
const PUBLIC_PATHS = ['/signin', '/signup']
const unProfile = '/dev/profile/select'
const client = generateClient();

async function AuthRedirect(request: NextRequest,user:string|undefined,path:string) {
  try {
    // 認証済みユーザーの場合
    if (user) {
      // 未認証ユーザー専用パスへのアクセスを防ぐ
      if (PUBLIC_PATHS.some(p => path.startsWith(p))) {
        return [NextResponse.redirect(new URL('/dm', request.url)),false]
      }
    } 
    // 未認証ユーザーの場合
    else {
      // 認証が必要なパスへのアクセスを防ぐ
      if (AUTH_PATHS.some(p => path.startsWith(p))) {
        return [NextResponse.redirect(new URL('/signin', request.url)),false]
      }
    }

    return [NextResponse.next(),true];
  } catch (error) {
    console.error('Middleware error:', error)
    return [NextResponse.redirect(new URL('/signin', request.url)),false]
  }
}

async function ProfileRedirect(request: NextRequest,userId:string|undefined,path:string) {
  if(!userId){
    return NextResponse.redirect(new URL('/signin', request.url))
  }
  const cookie = request.cookies.get('profileId')
  if (!cookie) {
    return NextResponse.redirect(new URL(`${unProfile}/?next=${path}`, request.url))
  }
  const profileId = await decryptUseCase(cookie.value);
  try {
    const response = await client.graphql({
      query: getProfile,
      variables: { userId, profileId }
    }) as { data: { getProfiles: Profiles } };
    if(response.data.getProfiles!=null){
      return NextResponse.next()
    }
    if(path==unProfile){
      return NextResponse.redirect(new URL(`${unProfile}`, request.url))
    }else{
      return NextResponse.redirect(new URL(`${unProfile}/?next=${path}`, request.url))
    }
  } catch {
    console.error('Middleware error:')
    return NextResponse.redirect(new URL(`${unProfile}/?next=${path}`, request.url))
  }
}

export async function middleware(request: NextRequest) {
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
  // 現在のパスを取得
  const path = request.nextUrl.pathname
  const [firstRes,next] = await AuthRedirect(request,user?.userId,path)
  if(next){
  const secondRes = await ProfileRedirect(request,user?.userId,path)
    return secondRes
  }else{
    return firstRes
  }

}
// ミドルウェアを適用するパスを設定
export const config = {
  matcher: ['/dm', '/signin', '/signup']
}