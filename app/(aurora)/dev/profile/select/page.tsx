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
import Link from "next/link";
import { flex, padding, text } from "@/_lib/tailwindcss";

Amplify.configure(amplifyConfig, { ssr: true });
export default async function Page({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | undefined } 
}) {
  // searchParamsを非同期で取得
  const params = await searchParams;
  const next = params.next || '/dm';

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
  }) as Promise<{ data: { queryProfilesByUserIdOrderIndex: ProfilesConnection } }>)
    .then(res => res.data.queryProfilesByUserIdOrderIndex.items);

  if (!profiles) redirect('/dev/profile/create');
  const filteredProfiles = profiles.filter(profile => profile !== null);

  return (
    <>
      <SelectProfile profiles={filteredProfiles} next={next}>
        <Link href="/dev/profile/create"
          className={`flex flex-col items-center bg-green-300 rounded-md hover:bg-green-500 cursor-pointer ${padding.S} ${text.M}`}
        >
          <div className={`w-28 h-28 bg-white relative rounded-full flex items-center justify-center my-3 ${flex.row}`}>
            <span className="absolute w-1/3 h-[2px] bg-black"></span>
            <span className="absolute w-1/3 h-[2px] bg-black rotate-90"></span>
          </div>
          <div className="w-full truncate">
            <h2>新規作成</h2>
          </div>
        </Link>
      </SelectProfile>
    </>
  )
}