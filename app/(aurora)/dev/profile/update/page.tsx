import UpdateProfileForm from "@/(aurora)/_containers/UpdateProfileForm/presentational";
import { amplifyConfig } from "@/_lib/amplify/amplifyConfig";
import getCookieUseCase from "@/_lib/cookie/getCookieUseCase"
import decryptUseCase from "@/_lib/Crypto/decryptUseCase";
import { getProfilesByProfileId } from "@/_lib/Featchers/Profiles/featcher";
import { ProfilesConnection } from "@/_lib/graphql/API";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { redirect } from "next/navigation";

Amplify.configure(amplifyConfig, { ssr: true });

export default async function Page() {
  const value = await getCookieUseCase('profileId');
  if (!value) redirect('/dev/profile/select');
  const profileId = await decryptUseCase(value);
  const client = generateClient();
  try {
    const response = await client.graphql({
      query: getProfilesByProfileId,
      variables: { profileId }
    }) as { data: { queryProfilesByProfileIdIndex: ProfilesConnection } };
    const data = response.data.queryProfilesByProfileIdIndex;
    const profile = data.items?.[0];
    if(!profile) redirect('/dev/profile/select');
    return (
      <UpdateProfileForm profile={profile} />
    )
  } catch {
    redirect('/dev/profile/select')
  }
}