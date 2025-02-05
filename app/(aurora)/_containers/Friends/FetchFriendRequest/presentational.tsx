'use client';

import { Button } from '@/_components/ui/button';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { useFriendRequests } from '@/_lib/hooks/useFriendRequests';
import { useFriends } from '@/_lib/hooks/useFriends';
import {
  CreateFriendsInput,
  FriendRequests,
  FriendStatus,
  UpdateFriendRequestsInput,
  FriendRequestStatus
} from '@/_lib/graphql/API';
import { generateClient } from 'aws-amplify/api';
import { useEffect, useState } from 'react';
import { onCreateFriendRequests, onDeleteFriendRequests } from '@/_lib/graphql/subscriptions';

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
    // 新規フレンドリクエストのサブスクリプション
    const createSubscription = client.graphql({
      query: onCreateFriendRequests
    }).subscribe({
      next: ({ data }) => {
        const newRequest = data.onCreateFriendRequests;
        // 自分宛てのリクエストかつ保留中のものだけを追加
        if (newRequest?.receiverId === userId && 
            newRequest?.status === FriendRequestStatus.PENDING) {
          setFriendRequests(prev => [...prev, newRequest]);
        }
      },
      error: (error) => {
        console.error('Subscription error:', error);
        setError('新しいリクエストの受信中にエラーが発生しました');
      }
    });

    // フレンドリクエスト削除のサブスクリプション
    const deleteSubscription = client.graphql({
      query: onDeleteFriendRequests
    }).subscribe({
      next: ({ data }) => {
        const deletedRequest = data.onDeleteFriendRequests;
        if (deletedRequest?.receiverId === userId) {
          setFriendRequests(prev => 
            prev.filter(request => request.requestId !== deletedRequest.requestId)
          );
        }
      },
      error: (error) => {
        console.error('Delete subscription error:', error);
      }
    });

    return () => {
      createSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, [userId]);

  const handleAccept = async (requestId: string) => {
    try {
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

      // まず友達関係を作成
      await Promise.all([
        addFriend(friendInputForReceiver),
        addFriend(friendInputForSender)
      ]);

      // その後でリクエストを削除
      const friendRequestInput: UpdateFriendRequestsInput = {
        requestId,
      };
      await removeFriendRequest(friendRequestInput);

      // UIからリクエストを削除（サブスクリプションのバックアップとして）
      setFriendRequests(prev => 
        prev.filter(request => request.requestId !== requestId)
      );
      setError(null);
    } catch (err) {
      setError('リクエストの承認中にエラーが発生しました: ' + err);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const input: UpdateFriendRequestsInput = {
        requestId,
      };
      await removeFriendRequest(input);
      // UIからリクエストを削除（サブスクリプションのバックアップとして）
      setFriendRequests(prev => 
        prev.filter(request => request.requestId !== requestId)
      );
      setError(null);
    } catch (err) {
      setError('リクエストの拒否中にエラーが発生しました: ' + err);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {friendRequests.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          フレンドリクエストはありません
        </div>
      ) : (
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
      )}
    </div>
  );
}