import { FetchFriendRequest } from "@/(aurora)/_containers/FetchFriendRequest/presentational";
import { amplifyConfig } from "@/_lib/amplify/amplifyConfig";
import { runWithAmplifyServerContext } from "@/_lib/amplify/amplifyServerContext";
import { getFriendRequestsByReceiverId } from "@/_lib/Featchers/FriendRequests/featcher";
import { FriendRequestsConnection } from "@/_lib/graphql/API";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

Amplify.configure(amplifyConfig, { ssr: true });
export default async function Create() {
  const client = generateClient();
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
  const response = await client.graphql({
    query: getFriendRequestsByReceiverId,
    variables: { receiverId: user!.userId }
  }) as { data: { queryFriendRequestsByReceiverIdIndex: FriendRequestsConnection } };
  const friendRequests = (response.data.queryFriendRequestsByReceiverIdIndex.items || []).filter(request => request !== null);
  return (
    <div className="container mx-auto py-8">
      <FetchFriendRequest userId={user!.userId} profileId={"test"} requests={friendRequests!} />
    </div>
  )
}