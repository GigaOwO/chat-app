'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { useFriendRequests } from '@/_lib/hooks/useFriendRequests';
import { useUsers } from '@/_lib/hooks/useUsers';
import { 
  FriendRequests, 
  FriendRequestStatus,
  Users
} from '@/_lib/graphql/API';
import { 
  onCreateFriendRequests, 
  onUpdateFriendRequests, 
  onDeleteFriendRequests 
} from '@/_lib/graphql/subscriptions';

interface FriendRequestsContextValue {
  pendingRequests: FriendRequests[];
  requestUsers: Record<string, Users>;
  loading: boolean;
  error: string | null;
}

const FriendRequestsContext = createContext<FriendRequestsContextValue | null>(null);

const client = generateClient();

export function FriendRequestsProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [pendingRequests, setPendingRequests] = useState<FriendRequests[]>([]);
  const [requestUsers, setRequestUsers] = useState<Record<string, Users>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchFriendRequestsByReceiverId } = useFriendRequests();
  const { fetchUser } = useUsers();

  // ユーザー情報の取得
  const fetchUserDetails = async (requests: FriendRequests[]) => {
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

  // 初期化処理
  useEffect(() => {
    const initialize = async () => {
      try {
        const { userId } = await getCurrentUser();
        setUserId(userId);

        const response = await fetchFriendRequestsByReceiverId(userId);
        if (response?.items) {
          const pendingRequests = response.items
            .filter((r): r is FriendRequests => 
              r !== null && r.status === FriendRequestStatus.PENDING
            );
          
          setPendingRequests(pendingRequests);
          await fetchUserDetails(pendingRequests);
        }
      } catch (err) {
        console.error('Error initializing friend requests:', err);
        setError('フレンドリクエストの初期化中にエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // サブスクリプションの設定
  useEffect(() => {
    if (!userId) return;

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
            const user = await fetchUser(newRequest.senderId);
            if (user) {
              setRequestUsers(prev => ({
                ...prev,
                [newRequest.senderId]: user
              }));
            }
            setPendingRequests(prev => [...prev, newRequest]);
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
            setPendingRequests(prev => 
              prev.map(request => 
                request.requestId === updatedRequest.requestId ? updatedRequest : request
              ).filter(request => request.status === FriendRequestStatus.PENDING)
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
            setPendingRequests(prev => 
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

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [userId]);

  return (
    <FriendRequestsContext.Provider 
      value={{ 
        pendingRequests, 
        requestUsers,
        loading, 
        error 
      }}
    >
      {children}
    </FriendRequestsContext.Provider>
  );
}

export function useFriendRequestsContext() {
  const context = useContext(FriendRequestsContext);
  if (!context) {
    throw new Error('useFriendRequestsContext must be used within a FriendRequestsProvider');
  }
  return context;
}