'use client';

import { Button } from '@/_components/ui/button';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { useFriendRequests } from '@/_lib/hooks/useFriendRequests';
import { useFriends } from '@/_lib/hooks/useFriends';
import { useUsers } from '@/_lib/hooks/useUsers';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import {
  CreateFriendsInput,
  FriendRequests,
  FriendStatus,
  UpdateFriendRequestsInput,
  FriendRequestStatus,
  Users,
  Profiles,
  DeleteFriendRequestsInput
} from '@/_lib/graphql/API';
import { generateClient } from 'aws-amplify/api';
import { useEffect, useState } from 'react';
import { onCreateFriendRequests, onDeleteFriendRequests, onUpdateFriendRequests } from '@/_lib/graphql/subscriptions';
import { ProfileSelectorModal } from './ProfileSelectorModal';

const client = generateClient();

interface FetchFriendRequestProps {
  userId: string;
  profileId: string;
  requests: FriendRequests[];
}

export function FetchFriendRequest({
  userId,
  requests
}: FetchFriendRequestProps) {
  const [friendRequests, setFriendRequests] = useState<FriendRequests[]>(requests);
  const [requestUsers, setRequestUsers] = useState<Record<string, Users>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<FriendRequests | null>(null);
  const [isProfileSelectorOpen, setIsProfileSelectorOpen] = useState(false);
  
  const { removeFriendRequest, modifyFriendRequest } = useFriendRequests();
  const { addFriend } = useFriends();
  const { fetchUser } = useUsers();
  const { fetchProfilesByUserId } = useProfiles();

  // プロファイル一覧の取得
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const response = await fetchProfilesByUserId(userId);
        if (response?.items) {
          setProfiles(response.items.filter((p): p is Profiles => p !== null));
        }
      } catch (err) {
        console.error('Error loading profiles:', err);
        setError('プロファイルの読み込みに失敗しました');
      }
    };

    loadProfiles();
  }, [userId, fetchProfilesByUserId]);

  // リクエスト送信者のユーザー情報を取得
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

  // 初期リクエストのユーザー情報を取得
  useEffect(() => {
    if (requests.length > 0) {
      fetchRequestUsers(requests);
    }
  }, [requests]);

  // リアルタイム更新のサブスクリプション
  useEffect(() => {
    const subscriptions: { unsubscribe: () => void }[] = [];

    try {
      // 新規フレンドリクエストの監視
      const createSub = client.graphql({
        query: onCreateFriendRequests,
      }).subscribe({
        next: async ({ data }) => {
          const newRequest = data.onCreateFriendRequests;
          if (newRequest && 
              newRequest.receiverId === userId &&
              newRequest.status === FriendRequestStatus.PENDING) {
            console.log('New friend request received:', newRequest);
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
          console.error('Create subscription error:', error);
        }
      });
      subscriptions.push(createSub);

      // フレンドリクエストの更新を監視
      const updateSub = client.graphql({
        query: onUpdateFriendRequests,
      }).subscribe({
        next: ({ data }) => {
          const updatedRequest = data.onUpdateFriendRequests;
          if (updatedRequest?.receiverId === userId) {
            console.log('Friend request updated:', updatedRequest);
            setFriendRequests(prev => 
              prev.map(request => 
                request.requestId === updatedRequest.requestId ? updatedRequest : request
              )
            );
          }
        },
        error: (error) => {
          console.error('Update subscription error:', error);
        }
      });
      subscriptions.push(updateSub);

      // フレンドリクエストの削除を監視
      const deleteSub = client.graphql({
        query: onDeleteFriendRequests,
      }).subscribe({
        next: ({ data }) => {
          const deletedRequest = data.onDeleteFriendRequests;
          if (deletedRequest?.receiverId === userId) {
            console.log('Friend request deleted:', deletedRequest);
            setFriendRequests(prev => 
              prev.filter(request => request.requestId !== deletedRequest.requestId)
            );
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
      subscriptions.push(deleteSub);

    } catch (error) {
      console.error('Error setting up subscriptions:', error);
      setError('リアルタイム更新の設定中にエラーが発生しました');
    }

    // クリーンアップ関数
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [userId, fetchUser]);

  // プロファイル選択後のフレンド承認処理
  const handleProfileSelect = async (selectedProfileId: string) => {
    if (!selectedRequest) return;

    try {
      setIsLoading(prev => ({ ...prev, [selectedRequest.requestId]: true }));

      // フレンドリクエストのステータスを ACCEPTED に更新
      const updateRequestInput: UpdateFriendRequestsInput = {
        requestId: selectedRequest.requestId,
        status: FriendRequestStatus.ACCEPTED,
        updatedAt: new Date().toISOString()
      };

      await modifyFriendRequest(updateRequestInput);

      // 受信者のフレンド関係 (自分)
      const friendInputForReceiver: CreateFriendsInput = {
        userId: userId,
        friendId: selectedRequest.senderId,
        status: FriendStatus.ACTIVE,
        userProfileId: selectedProfileId,
        friendProfileId: selectedRequest.senderProfileId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 送信者のフレンド関係
      const friendInputForSender: CreateFriendsInput = {
        userId: selectedRequest.senderId,
        friendId: userId,
        status: FriendStatus.ACTIVE,
        userProfileId: selectedRequest.senderProfileId,
        friendProfileId: selectedProfileId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // フレンド関係を同時に作成
      await Promise.all([
        addFriend(friendInputForReceiver),
        addFriend(friendInputForSender)
      ]);

      // フレンドリクエストを削除
      const deleteRequestInput: DeleteFriendRequestsInput = {
        requestId: selectedRequest.requestId
      };
      await removeFriendRequest(deleteRequestInput);

      setError(null);
    } catch (err) {
      console.error('Error accepting friend request:', err);
      setError('リクエストの承認中にエラーが発生しました');
    } finally {
      setIsLoading(prev => ({ ...prev, [selectedRequest.requestId]: false }));
      setIsProfileSelectorOpen(false);
      setSelectedRequest(null);
    }
  };

  // リクエスト拒否処理
  const handleReject = async (requestId: string) => {
    try {
      setIsLoading(prev => ({ ...prev, [requestId]: true }));
      
      // フレンドリクエストを削除
      const input: DeleteFriendRequestsInput = {
        requestId,
      };
      await removeFriendRequest(input);

      setError(null);
    } catch (err) {
      setError('リクエストの拒否中にエラーが発生しました' + err);
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
                  onClick={() => {
                    setSelectedRequest(request);
                    setIsProfileSelectorOpen(true);
                  }}
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

      <ProfileSelectorModal
        isOpen={isProfileSelectorOpen}
        onClose={() => {
          setIsProfileSelectorOpen(false);
          setSelectedRequest(null);
        }}
        profiles={profiles}
        onSelect={handleProfileSelect}
        loading={selectedRequest ? isLoading[selectedRequest.requestId] : false}
        error={error}
      />
    </div>
  );
}