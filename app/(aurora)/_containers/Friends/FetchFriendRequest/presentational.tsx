'use client';

import { Button } from '@/_components/ui/button';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { useFriendRequests } from '@/_lib/hooks/useFriendRequests';
import { useFriends } from '@/_lib/hooks/useFriends';
import { useUsers } from '@/_lib/hooks/useUsers';
import {
  CreateFriendsInput,
  FriendRequests,
  FriendStatus,
  UpdateFriendRequestsInput,
  FriendRequestStatus,
  Users
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
  const [requestUsers, setRequestUsers] = useState<Record<string, Users>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const { removeFriendRequest } = useFriendRequests();
  const { addFriend } = useFriends();
  const { fetchUser } = useUsers();

  // ユーザー情報を取得する関数
  const fetchRequestUsers = async (requests: FriendRequests[]) => {
    try {
      const userPromises = requests.map(async (request) => {
        const user = await fetchUser(request.senderId);
        if (user) {
          setRequestUsers(prev => ({
            ...prev,
            [request.senderId]: user
          }));
        }
        return user;
      });

      await Promise.all(userPromises);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError('ユーザー情報の取得中にエラーが発生しました');
    }
  };

  useEffect(() => {
    // 初期リクエストのユーザー情報を取得
    if (requests.length > 0) {
      fetchRequestUsers(requests);
    }
  }, [requests]);

  useEffect(() => {
    // 新規フレンドリクエストのサブスクリプション
    const createSubscription = client.graphql({
      query: onCreateFriendRequests
    }).subscribe({
      next: async ({ data }) => {
        const newRequest = data.onCreateFriendRequests;
        if (newRequest?.receiverId === userId && 
            newRequest?.status === FriendRequestStatus.PENDING) {
          // 新しいリクエストのユーザー情報も取得
          const user = await fetchUser(newRequest.senderId);
          if (user) {
            setRequestUsers(prev => ({
              ...prev,
              [newRequest.senderId]: user
            }));
          }
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
          // ユーザー情報も削除
          setRequestUsers(prev => {
            const newUsers = { ...prev };
            delete newUsers[deletedRequest.senderId];
            return newUsers;
          });
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
  }, [userId, fetchUser]);

  const handleAccept = async (requestId: string) => {
    try {
      setIsLoading(prev => ({ ...prev, [requestId]: true }));
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

      await Promise.all([
        addFriend(friendInputForReceiver),
        addFriend(friendInputForSender)
      ]);

      const friendRequestInput: UpdateFriendRequestsInput = {
        requestId,
      };
      await removeFriendRequest(friendRequestInput);

      setFriendRequests(prev => 
        prev.filter(request => request.requestId !== requestId)
      );
      setRequestUsers(prev => {
        const newUsers = { ...prev };
        delete newUsers[selectedRequest.senderId];
        return newUsers;
      });
      setError(null);
    } catch (err) {
      setError('リクエストの承認中にエラーが発生しました: ' + err);
    } finally {
      setIsLoading(prev => ({ ...prev, [requestId]: false }));
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      setIsLoading(prev => ({ ...prev, [requestId]: true }));
      const selectedRequest = friendRequests.find(
        (request) => request.requestId === requestId
      );
      if (!selectedRequest) return;

      const input: UpdateFriendRequestsInput = {
        requestId,
      };
      await removeFriendRequest(input);

      setFriendRequests(prev => 
        prev.filter(request => request.requestId !== requestId)
      );
      setRequestUsers(prev => {
        const newUsers = { ...prev };
        delete newUsers[selectedRequest.senderId];
        return newUsers;
      });
      setError(null);
    } catch (err) {
      setError('リクエストの拒否中にエラーが発生しました: ' + err);
    } finally {
      setIsLoading(prev => ({ ...prev, [requestId]: false }));
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
              <span>
                {requestUsers[request.senderId]?.username || 'ユーザーを読み込み中...'}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleAccept(request.requestId)}
                  disabled={isLoading[request.requestId]}
                >
                  {isLoading[request.requestId] ? '処理中...' : '承認'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReject(request.requestId)}
                  disabled={isLoading[request.requestId]}
                >
                  {isLoading[request.requestId] ? '処理中...' : '拒否'}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}