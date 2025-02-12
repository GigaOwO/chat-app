import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from 'aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/_lib/amplify/amplifyServerContext'
import { cookies } from 'next/headers'
import decryptUseCase from '@/_lib/Crypto/decryptUseCase'
import { Amplify } from 'aws-amplify'
import { amplifyConfig } from '@/_lib/amplify/amplifyConfig'
import { generateClient } from 'aws-amplify/api'
import { getProfile, getProfilesByUserId } from '@/_lib/Featchers/Profiles/featcher'
import { Profiles, ProfilesConnection } from '@/_lib/graphql/API'

Amplify.configure(amplifyConfig, { ssr: true });
// 認証が必要なパス
const AUTH_PATHS = ['/dm', '/profile']
// 未認証ユーザーのみがアクセスできるパス
const PUBLIC_PATHS = ['/signin', '/signup']

async function AuthRedirect(request: NextRequest, user: string|undefined, path: string) {
  try {
    // 認証済みユーザーの場合
    if (user) {
      // 未認証ユーザー専用パスへのアクセスを防ぐ
      if (PUBLIC_PATHS.some(p => path.startsWith(p))) {
        return [NextResponse.redirect(new URL('/dm', request.url)), false];
      }
    } 
    // 未認証ユーザーの場合
    else {
      // 認証が必要なパスへのアクセスを防ぐ
      if (AUTH_PATHS.some(p => path.startsWith(p))) {
        return [NextResponse.redirect(new URL('/signin', request.url)), false];
      }
    }

    // ここを追加: publicパスの場合は、ProfileRedirectをスキップ
    if (PUBLIC_PATHS.some(p => path.startsWith(p))) {
      return [NextResponse.next(), false];
    }

    return [NextResponse.next(), true];
  } catch (error) {
    console.error('Middleware error:', error);
    return [NextResponse.redirect(new URL('/signin', request.url)), false];
  }
}

async function ProfileRedirect(request: NextRequest, userId: string|undefined, path: string) {
  // 未認証ユーザーの場合は、signinへリダイレクト
  if (!userId) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // プロフィール選択・作成関連のパスは、ProfileRedirectのチェックをスキップ
  if (path.startsWith('/profile')) {
    return NextResponse.next();
  }

  try {
    // プロフィールの存在チェック
    const client = generateClient();
    const response = await client.graphql({
      query: getProfilesByUserId,
      variables: { userId }
    }) as { data: { queryProfilesByUserIdOrderIndex: ProfilesConnection } };

    // プロフィールが存在しない場合は作成画面へ
    if (!response.data.queryProfilesByUserIdOrderIndex.items?.length) {
      return NextResponse.redirect(new URL('/profile/create', request.url));
    }

    const cookie = request.cookies.get('profileId');
    if (!cookie) {
      return NextResponse.redirect(new URL(`/profile/select/?next=${path}`, request.url));
    }

    const profileId = await decryptUseCase(cookie.value);
    if (!profileId) {
      return NextResponse.redirect(new URL(`/profile/select/?next=${path}`, request.url));
    }

    try {
      const profileResponse = await client.graphql({
        query: getProfile,
        variables: { userId, profileId }
      }) as { data: { getProfiles: Profiles } };

    // プロフィールが見つかった場合は次へ進む
      if (profileResponse.data.getProfiles) {
        return NextResponse.next();
      }

      // プロフィールが見つからない場合は選択画面へ
      return NextResponse.redirect(new URL(`/profile/select/?next=${path}`, request.url));
    } catch (error) {
      console.error('Profile fetch error:', error);
      return NextResponse.redirect(new URL(`/profile/select/?next=${path}`, request.url));
    }
  } catch (error) {
    console.error('ProfileRedirect error:', error);
    return NextResponse.redirect(new URL(`/profile/select/?next=${path}`, request.url));
  }
}

export async function middleware(request: NextRequest) {
  // 現在のパスを取得
  const path = request.nextUrl.pathname;

  // AmplifyServerContextを使用して現在のユーザーを取得
  const user = await runWithAmplifyServerContext({
    nextServerContext: {
      cookies: () => cookies(),
    },
    operation: async (contextSpec) => {
      try {
        return await getCurrentUser(contextSpec);
      } catch {
        return null;
      }
    },
  });

  const [firstRes, next] = await AuthRedirect(request, user?.userId, path);
  if (next) {
    const secondRes = await ProfileRedirect(request, user?.userId, path);
    return secondRes;
  }
  return firstRes;
}

export const config = {
  matcher: [
    '/dm/:path*',
    '/signin',
    '/signup',
    '/signup/confirm',
    '/profile/:path*'
  ]
};
