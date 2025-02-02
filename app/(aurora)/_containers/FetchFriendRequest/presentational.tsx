"use client"

import { FriendRequests } from "@/_lib/graphql/API";
import { onCreateFriendRequests } from "@/_lib/graphql/subscriptions";
import { generateClient  } from "aws-amplify/api";
import { useEffect, useState } from "react";

const client = generateClient();
export function FetchFriendRequest({receiverId,requests}: {receiverId: string, requests:FriendRequests[]}) {
  const [friendRequests, setFriendRequests] = useState<FriendRequests[]>(requests);
  useEffect(()=>{
    const subscription = client.graphql({
        query: onCreateFriendRequests,
        variables: { receiverId }
      })
      .subscribe({
        next: (data) => {
          setFriendRequests([...friendRequests, data.data.onCreateFriendRequests]);
        },
        error: (error) => {
          console.error(error);
        }
      });
    return () => {
      subscription.unsubscribe();
    }
  },[])

  return (
    <div>
      FetchFriendRequest
      {friendRequests.map(request => (
        <div key={request.requestId}>
          {request.requestId}
        </div>
      ))}
    </div>
  )
}