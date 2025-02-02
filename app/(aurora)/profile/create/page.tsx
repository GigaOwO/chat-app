import { CreateProfileContainer } from './_containers/Create';
import { runWithAmplifyServerContext } from '@/_lib/amplify/amplifyServerContext';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CreateProfilePage() {
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

  if (!user) {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">新しいプロフィールを作成</h1>
          <p className="mt-2 text-sm text-gray-600">
            プロフィール情報を入力してください
          </p>
        </div>

        <div className="flex justify-center">
          <CreateProfileContainer userId={user.userId} />
        </div>
      </div>
    </div>
  );
}