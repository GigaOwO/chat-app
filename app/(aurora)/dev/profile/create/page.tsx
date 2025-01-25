import CreateProfileForm from "@/(aurora)/_containers/CreateProfileForm/presentational";
import { runWithAmplifyServerContext } from "@/_lib/amplify/amplifyServerContext";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

export default async function Profile() {
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
  if (!user) return null;
  return (
    <CreateProfileForm userId={user?.userId}/>
  );
}

