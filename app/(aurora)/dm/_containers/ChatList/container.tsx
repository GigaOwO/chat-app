'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChatListPresentation } from './presentational';
import { useProfileContext } from '../../../_containers/Profile/context';
import { useConversations } from '@/_lib/hooks/useConversations';
import { useConversationParticipants } from '@/_lib/hooks/useConversationParticipants';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import { useFriends } from '@/_lib/hooks/useFriends';
import { useMessages } from '@/_lib/hooks/useMessages';
import { generateClient } from 'aws-amplify/api';
import { 
  onCreateMessages, 
  onUpdateConversations,
  onCreateConversationParticipants,
  onCreateConversations,
  onCreateFriends,
  onUpdateFriends
} from '@/_lib/graphql/subscriptions';
import { 
  Conversations, 
  Profiles, 
  Messages,
  ConversationParticipants,
  Friends,
  FriendStatus
} from '@/_lib/graphql/API';

export interface ChatWithProfile {
  conversation: Conversations;
  profile: Profiles;
  lastMessage?: Messages;
  isGroup: boolean;
  participants?: Profiles[];
  groupName?: string;
}

const client = generateClient();

// メモ化されたソート関数
function sortChatsByLastMessage(chatsToSort: ChatWithProfile[]) {
  return [...chatsToSort].sort((a, b) => {
    const aTime = a.lastMessage?.createdAt || a.conversation.lastMessageAt || a.conversation.createdAt;
    const bTime = b.lastMessage?.createdAt || b.conversation.lastMessageAt || b.conversation.createdAt;
    return new Date(bTime).getTime() - new Date(aTime).getTime();
  });
}

export function ChatListContainer() {
  const router = useRouter();
  const { currentProfile, isLoading: profileLoading } = useProfileContext();
  const { fetchConversation } = useConversations();
  const { 
    fetchConversationParticipantsByUserId,
    fetchConversationParticipants 
  } = useConversationParticipants();
  const { fetchMessagesByConversationId } = useMessages();
  const { fetchProfile } = useProfiles();
  const { fetchFriendsByUserProfileId } = useFriends();
  
  const [chats, setChats] = useState<ChatWithProfile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<Friends[]>([]);

  // フレンドリストの取得
  useEffect(() => {
    const loadFriends = async () => {
      if (!currentProfile?.profileId) return;
      
      try {
        const response = await fetchFriendsByUserProfileId(currentProfile.profileId);
        if (response?.items) {
          setFriends(response.items
            .filter((f): f is Friends => 
              f !== null && f.status === FriendStatus.ACTIVE
            )
          );
        }
      } catch (err) {
        console.error('Error loading friends:', err);
        setError('フレンドリストの読み込みに失敗しました');
      }
    };

    loadFriends();
  }, [currentProfile?.profileId, fetchFriendsByUserProfileId]);

  // チャットデータを取得する関数
  const fetchChatData = useCallback(async (participant: ConversationParticipants): Promise<ChatWithProfile | null> => {
    if (!currentProfile?.userId) return null;

    try {
      const conversation = await fetchConversation(participant.conversationId);
      if (!conversation) return null;

      const participants = await fetchConversationParticipants(participant.conversationId);
      if (!participants?.items) return null;

      const isGroup = conversation.type === 'GROUP';
      const messages = await fetchMessagesByConversationId(
        conversation.conversationId,
        1
      );
      const lastMessage = messages?.items?.[0] || undefined;

      if (isGroup) {
        // グループチャットの場合
        const participantProfiles = await Promise.all(
          participants.items
            .filter(p => p && p.userId !== currentProfile.userId)
            .map(async p => {
              if (!p) return null;
              const friend = friends.find(f => f.friendId === p.userId);
              if (!friend) return null;
              return await fetchProfile(p.userId, friend.friendProfileId);
            })
        );

        const validProfiles = participantProfiles.filter((p): p is Profiles => p !== null);
        
        if (validProfiles.length === 0) return null;

        return {
          conversation,
          profile: validProfiles[0], // 代表者のプロフィール
          lastMessage,
          isGroup: true,
          participants: validProfiles,
          groupName: conversation.name || `グループ (${validProfiles.length + 1})`
        };
      } else {
        // DMの場合
        const otherParticipant = participants.items.find(
          p => p && p.userId !== currentProfile.userId
        );
        if (!otherParticipant) return null;

        // フレンドリストに存在するかチェック
        const friend = friends.find(f => f.friendId === otherParticipant.userId);
        if (!friend) return null;

        const friendProfile = await fetchProfile(
          otherParticipant.userId,
          friend.friendProfileId
        );
        if (!friendProfile) return null;

        return {
          conversation,
          profile: friendProfile,
          lastMessage,
          isGroup: false
        };
      }
    } catch (err) {
      console.error(`Error loading chat ${participant.conversationId}:`, err);
      return null;
    }
  }, [currentProfile?.userId, friends, fetchConversation, fetchConversationParticipants, fetchProfile, fetchMessagesByConversationId]);

  // メインのデータ取得useEffect
  useEffect(() => {
    let mounted = true;

    const loadChats = async () => {
      if (!currentProfile?.userId) {
        setChats([]);
        setLoading(false);
        return;
      }
      
      try {
        setError(null);
        setLoading(true);
        const participations = await fetchConversationParticipantsByUserId(
          currentProfile.userId
        );
        
        if (!participations?.items || !mounted) return;

        const chatPromises = participations.items
          .filter((p): p is ConversationParticipants => p !== null)
          .map(participant => fetchChatData(participant));

        const results = await Promise.all(chatPromises);
        if (!mounted) return;

        const validChats = results.filter((chat): chat is ChatWithProfile => chat !== null);
        setChats(sortChatsByLastMessage(validChats));
      } catch (err) {
        console.error('Error loading chats:', err);
        if (mounted) {
          setError('チャット一覧の読み込みに失敗しました');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadChats();

    return () => {
      mounted = false;
    };
  }, [currentProfile?.userId, fetchChatData, fetchConversationParticipantsByUserId]);

  // サブスクリプションの設定
  useEffect(() => {
    if (!currentProfile?.userId) return;

    const subscriptions = [
      // フレンド作成のサブスクリプション
      (client.graphql({
        query: onCreateFriends
      })).subscribe({
        next: async ({ data }) => {
          const newFriend = data.onCreateFriends;
          if (!newFriend || newFriend.userId !== currentProfile.userId) return;

          setFriends(prevFriends => {
            const exists = prevFriends.some(f => f.friendId === newFriend.friendId);
            if (exists) return prevFriends;
            return newFriend.status === FriendStatus.ACTIVE 
              ? [...prevFriends, newFriend]
              : prevFriends;
          });

          // フレンドリストが更新されたら、チャットリストも再取得
          const participations = await fetchConversationParticipantsByUserId(
            currentProfile.userId
          );
          
          if (!participations?.items) return;

          const chatPromises = participations.items
            .filter((p): p is ConversationParticipants => p !== null)
            .map(participant => fetchChatData(participant));

          const results = await Promise.all(chatPromises);
          const validChats = results.filter((chat): chat is ChatWithProfile => chat !== null);
          setChats(sortChatsByLastMessage(validChats));
        }
      }),

      // フレンド更新のサブスクリプション
      (client.graphql({
        query: onUpdateFriends
      })).subscribe({
        next: async ({ data }) => {
          const updatedFriend = data.onUpdateFriends;
          if (!updatedFriend || updatedFriend.userId !== currentProfile.userId) return;

          setFriends(prevFriends => {
            return prevFriends.map(friend =>
              friend.friendId === updatedFriend.friendId ? updatedFriend : friend
            ).filter(friend => friend.status === FriendStatus.ACTIVE);
          });

          // フレンドの状態が更新されたら、チャットリストも再取得
          const participations = await fetchConversationParticipantsByUserId(
            currentProfile.userId
          );
          
          if (!participations?.items) return;

          const chatPromises = participations.items
            .filter((p): p is ConversationParticipants => p !== null)
            .map(participant => fetchChatData(participant));

          const results = await Promise.all(chatPromises);
          const validChats = results.filter((chat): chat is ChatWithProfile => chat !== null);
          setChats(sortChatsByLastMessage(validChats));
        }
      }),

      // メッセージ作成のサブスクリプション
      (client.graphql({
        query: onCreateMessages
      })).subscribe({
        next: async ({ data }) => {
          const newMessage = data.onCreateMessages;
          if (!newMessage) return;

          setChats(prevChats => {
            const chatIndex = prevChats.findIndex(
              chat => chat.conversation.conversationId === newMessage.conversationId
            );

            if (chatIndex === -1) return prevChats;

            const updatedChats = [...prevChats];
            updatedChats[chatIndex] = {
              ...updatedChats[chatIndex],
              lastMessage: newMessage,
              conversation: {
                ...updatedChats[chatIndex].conversation,
                lastMessageAt: newMessage.createdAt
              }
            };

            return sortChatsByLastMessage(updatedChats);
          });
        }
      }),

      // 会話更新のサブスクリプション
      (client.graphql({
        query: onUpdateConversations
      })).subscribe({
        next: ({ data }) => {
          const updatedConversation = data.onUpdateConversations;
          if (!updatedConversation) return;

          setChats(prevChats => {
            const chatIndex = prevChats.findIndex(
              chat => chat.conversation.conversationId === updatedConversation.conversationId
            );

            if (chatIndex === -1) return prevChats;

            const updatedChats = [...prevChats];
            updatedChats[chatIndex] = {
              ...updatedChats[chatIndex],
              conversation: updatedConversation
            };

            return sortChatsByLastMessage(updatedChats);
          });
        }
      }),

      // 新しい会話作成のサブスクリプション
      (client.graphql({
        query: onCreateConversations
      })).subscribe({
        next: ({ data }) => {
          const newConversation = data.onCreateConversations;
          if (!newConversation) return;
          // 新しい会話が作成された時は、参加者の追加を待つ
          // 参加者の追加は別のサブスクリプションで処理
        }
      }),

      // 会話参加者追加のサブスクリプション
      (client.graphql({
        query: onCreateConversationParticipants
      })).subscribe({
        next: async ({ data }) => {
          const newParticipant = data.onCreateConversationParticipants;
          if (!newParticipant || newParticipant.userId !== currentProfile.userId) return;

          const newChat = await fetchChatData(newParticipant);
          if (!newChat) return;

          setChats(prevChats => {
            const exists = prevChats.some(
              chat => chat.conversation.conversationId === newChat.conversation.conversationId
            );
            if (exists) return prevChats;

            return sortChatsByLastMessage([...prevChats, newChat]);
          });
        }
      })
    ];

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [currentProfile?.userId, fetchChatData]);

  // チャット選択のハンドラー
  const handleSelectChat = useCallback((conversationId: string) => {
    const chat = chats.find(c => c.conversation.conversationId === conversationId);
    if (!chat) return;

    // グループチャットとDMで異なるルーティング
    const path = chat.isGroup
      ? `/dm/group/${conversationId}`
      : `/dm/${chat.profile.userId}`;
    
    router.push(path);
  }, [router, chats]);

  return (
    <ChatListPresentation
      chats={chats}
      loading={loading || profileLoading}
      error={error}
      onSelectChat={handleSelectChat}
    />
  );
}
