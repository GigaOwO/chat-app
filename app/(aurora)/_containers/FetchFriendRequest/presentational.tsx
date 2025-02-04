"use client"

import { useFriendRequests } from "@/(aurora)/_hooks/FriendRequests/useFriendRequests";
import { useFriends } from "@/(aurora)/_hooks/Friends/useFriends";
import { CreateFriendsInput, FriendRequests, FriendStatus, UpdateFriendRequestsInput } from "@/_lib/graphql/API";
import { onCreateFriendRequests } from "@/_lib/graphql/subscriptions";
import { generateClient  } from "aws-amplify/api";
import { useEffect, useState } from "react";

const client = generateClient();
export function FetchFriendRequest({userId,profileId,requests}: {userId: string,profileId:string, requests:FriendRequests[]}) {
  const [friendRequests, setFriendRequests] = useState<FriendRequests[]>(requests);
  const { removeFriendRequest } = useFriendRequests();
  const { addFriend } = useFriends();
  useEffect(()=>{
    const subscription = client.graphql({
        query: onCreateFriendRequests,
        variables: { receiverId:userId }
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

  const handleAccept = async (requestId: string) => {
    const friendRequestInput:UpdateFriendRequestsInput = {
      requestId,
    }
    await removeFriendRequest(friendRequestInput);
    setFriendRequests(friendRequests.filter(request => request.requestId !== requestId));
    const selectedRequest = friendRequests.filter((request:FriendRequests) => request.requestId === requestId)[0];
    const friendInputForReceiver:CreateFriendsInput = {
      userId: userId,
      friendId: selectedRequest.senderId,
      status: FriendStatus.ACTIVE,
      userProfileId: profileId,
      friendProfileId: selectedRequest.senderProfileId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const friendInputForSender:CreateFriendsInput = {
      userId: selectedRequest.senderId,
      friendId: userId,
      status: FriendStatus.ACTIVE,
      userProfileId: selectedRequest.senderProfileId,
      friendProfileId: profileId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    await addFriend(friendInputForReceiver)
    await addFriend(friendInputForSender)

  }

  const handleReject = async (requestId: string) => {
    const input:UpdateFriendRequestsInput = {
      requestId,
    }
    await removeFriendRequest(input);
    setFriendRequests(friendRequests.filter(request => request.requestId !== requestId));
  }

  return (
    <div>
      FetchFriendRequest
      {friendRequests.map(request => (
        <div key={request.requestId} className="flex gap-10">
          <div className="w-80">{request.senderId}</div>
          <div className="flex gap-4">
            <button onClick={() => handleAccept(request.requestId)}>Accept</button>
            <button onClick={() => handleReject(request.requestId)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  )
}