import Link from 'next/link';
import { Button } from '@/_components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-black1">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white1 sm:text-6xl">
              Connect with Your Alternate Personas
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray1">
              一つのアカウントで複数のプロフィールを使い分け、
              あなたの様々な一面を表現できるメッセージングプラットフォーム
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup">
                <Button 
                  variant="default"
                  size="lg"
                  className="bg-gray2 hover:bg-gray3 text-white1"
                >
                  無料で始める
                </Button>
              </Link>
              <Link href="/signin">
                <Button 
                  variant="outline"
                  size="lg"
                  className="text-gray3 bg-white hover:bg-white1"
                >
                  ログイン
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-gray1">
              主な機能
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white1 sm:text-4xl">
              シンプルで使いやすい機能
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white1">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray2">
                    🎭
                  </div>
                  複数のプロフィール
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray1">
                  一つのアカウントで複数のプロフィールを作成・管理できます。
                  シーンに応じて使い分けることができます。
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white1">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray2">
                    💬
                  </div>
                  シンプルなメッセージング
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray1">
                  直感的なインターフェースで、
                  スムーズなコミュニケーションを実現します。
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white1">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray2">
                    🎨
                  </div>
                  カスタマイズ可能なテーマ
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray1">
                  各プロフィールごとに異なるテーマカラーを設定できます。
                  視覚的に簡単に切り替えを確認できます。
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white1">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray2">
                    🔒
                  </div>
                  セキュアな環境
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray1">
                  AWS Cognitoを利用した安全な認証システムで、
                  あなたのデータを守ります。
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}