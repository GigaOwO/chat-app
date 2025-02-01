import { CreateFriendRequestForm } from "@/(aurora)/_containers/CreateFriendRequest/presentational";
import { runWithAmplifyServerContext } from "@/_lib/amplify/amplifyServerContext";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Create() {
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
  if(!user) {
    redirect('/signin')
  }

  return (
    <div className="container mx-auto py-8">
      <CreateFriendRequestForm senderId={user.userId} senderName={user.username} />
    </div>
  )
}