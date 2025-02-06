'use client';

import { Button } from '@/_components/ui/button';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { useFriendRequests } from '@/_lib/hooks/useFriendRequests';
import { useFriends } from '@/_lib/hooks/useFriends';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import { useFriendRequestsContext } from '../FriendRequestsContext';
import {
  CreateFriendsInput,
  FriendRequests,
  FriendStatus,
  UpdateFriendRequestsInput,
  FriendRequestStatus,
  DeleteFriendRequestsInput,
  Profiles,
} from '@/_lib/graphql/API';
import { useState, useEffect } from 'react';
import { ProfileSelectorModal } from './ProfileSelectorModal';

interface FetchFriendRequestProps {
  userId: string;
  profileId: string;
}

export function FetchFriendRequest({
  userId,
}: FetchFriendRequestProps) {
  const { pendingRequests, requestUsers, loading: contextLoading, error: contextError } = useFriendRequestsContext();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<FriendRequests | null>(null);
  const [isProfileSelectorOpen, setIsProfileSelectorOpen] = useState(false);
  
  const { removeFriendRequest, modifyFriendRequest } = useFriendRequests();
  const { addFriend } = useFriends();
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

  if (contextLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {(error || contextError) && (
        <Alert variant="destructive">
          <AlertDescription>{error || contextError}</AlertDescription>
        </Alert>
      )}

      {pendingRequests.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          フレンドリクエストはありません
        </div>
      ) : (
        <ul className="space-y-2">
          {pendingRequests.map((request) => (
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