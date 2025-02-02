import { SelectProfileContainer } from './_containers/Select';
import { runWithAmplifyServerContext } from '@/_lib/amplify/amplifyServerContext';
import { getProfilesByUserId } from '@/_lib/Featchers/Profiles/featcher';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { generateClient } from 'aws-amplify/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ProfilesConnection } from '@/_lib/graphql/API';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function SelectProfilePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const nextPath = params.next || '/dm';

  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies: () => cookies() },
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

  const client = generateClient();
  try {
    const response = await client.graphql({
      query: getProfilesByUserId,
      variables: { userId: user.userId }
    }) as { data: { queryProfilesByUserIdOrderIndex: ProfilesConnection } };

    const profiles = response.data.queryProfilesByUserIdOrderIndex.items
      ?.filter((p): p is NonNullable<typeof p> => p !== null)
      .sort((a, b) => a.order - b.order);

    if (!profiles?.length) {
      redirect('/profile/create');
    }

    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SelectProfileContainer 
            profiles={profiles}
            defaultRedirect={nextPath}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching profiles:', error);
    redirect('/profile/create');
  }
}