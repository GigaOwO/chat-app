import SelectProfile from "@/(aurora)/_containers/SelectProfile/presentational";
import { runWithAmplifyServerContext } from "@/_lib/amplify/amplifyServerContext";
import { getProfilesByUserId } from "@/_lib/Featchers/Profiles/featcher";
import { ProfilesConnection } from "@/_lib/graphql/API";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth/server"
import { cookies } from 'next/headers'
import { Amplify } from 'aws-amplify';
import { amplifyConfig } from '@/_lib/amplify/amplifyConfig';
import { redirect } from "next/navigation";

Amplify.configure(amplifyConfig, { ssr: true });
export default async function Page() {
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
  const client = generateClient();
  const profiles = await (client.graphql({
    query: getProfilesByUserId,
    variables: { userId: user?.username }
  }) as Promise<{ data: { queryProfilesByUserIdOrderIndex: ProfilesConnection } }>).then(res => res.data.queryProfilesByUserIdOrderIndex.items);

  if (!profiles) redirect('/dev/profile/create');
  const filteredProfiles = profiles.filter(profile => profile !== null);

  return (
    <SelectProfile profiles={filteredProfiles}/>
  )
}