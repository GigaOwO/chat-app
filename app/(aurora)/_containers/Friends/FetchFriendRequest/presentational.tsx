'use client';

import { Button } from '@/_components/ui/button';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { useFriendRequests } from '@/_lib/hooks/useFriendRequests';
import { useFriends } from '@/_lib/hooks/useFriends';
import {
  CreateFriendsInput,
  FriendRequests,
  FriendStatus,
  UpdateFriendRequestsInput
} from '@/_lib/graphql/API';
import { generateClient } from 'aws-amplify/api';
import { useEffect, useState } from 'react';
import { onCreateFriendRequests } from '@/_lib/graphql/subscriptions';

const client = generateClient();

interface FetchFriendRequestProps {
  userId: string;
  profileId: string;
  requests: FriendRequests[];
}

export function FetchFriendRequest({
  userId,
  profileId,
  requests
}: FetchFriendRequestProps) {
  const [friendRequests, setFriendRequests] = useState<FriendRequests[]>(requests);
  const [error, setError] = useState<string | null>(null);
  const { removeFriendRequest } = useFriendRequests();
  const { addFriend } = useFriends();

  useEffect(() => {
    const subscription = client.graphql({
      query: onCreateFriendRequests,
      variables: { receiverId: userId }
    })
    .subscribe({
      next: (data) => {
        setFriendRequests([...friendRequests, data.data.onCreateFriendRequests]);
      },
      error: (error) => {
        console.error(error);
        setError('新しいリクエストの受信中にエラーが発生しました');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [userId, friendRequests]);

  const handleAccept = async (requestId: string) => {
    try {
      const friendRequestInput: UpdateFriendRequestsInput = {
        requestId,
      };
      await removeFriendRequest(friendRequestInput);

      const selectedRequest = friendRequests.find(
        (request) => request.requestId === requestId
      );
      if (!selectedRequest) return;

      const friendInputForReceiver: CreateFriendsInput = {
        userId: userId,
        friendId: selectedRequest.senderId,
        status: FriendStatus.ACTIVE,
        userProfileId: profileId,
        friendProfileId: selectedRequest.senderProfileId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const friendInputForSender: CreateFriendsInput = {
        userId: selectedRequest.senderId,
        friendId: userId,
        status: FriendStatus.ACTIVE,
        userProfileId: selectedRequest.senderProfileId,
        friendProfileId: profileId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addFriend(friendInputForReceiver);
      await addFriend(friendInputForSender);

      setFriendRequests(friendRequests.filter((request) => request.requestId !== requestId));
      setError(null);
    } catch (err) {
      setError('リクエストの承認中にエラーが発生しました' + err);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const input: UpdateFriendRequestsInput = {
        requestId,
      };
      await removeFriendRequest(input);
      setFriendRequests(friendRequests.filter((request) => request.requestId !== requestId));
      setError(null);
    } catch (err) {
      setError('リクエストの拒否中にエラーが発生しました' + err);
    }
  };

  if (friendRequests.length === 0) {
    return (
      <div className="text-center text-gray-500">
        フレンドリクエストはありません
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <ul className="space-y-2">
        {friendRequests.map((request) => (
          <li
            key={request.requestId}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-100"
          >
            <span>{request.senderId}</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleAccept(request.requestId)}
              >
                承認
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReject(request.requestId)}
              >
                拒否
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}