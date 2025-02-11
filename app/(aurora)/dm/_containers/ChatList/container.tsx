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
  onUpdateConversations 
} from '@/_lib/graphql/subscriptions';
import type { 
  Conversations, 
  Profiles, 
  Messages,
  ConversationParticipants
} from '@/_lib/graphql/API';

export interface ChatWithProfile {
  conversation: Conversations;
  profile: Profiles;
  lastMessage?: Messages;
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
  const { fetchFriend } = useFriends();
  
  const [chats, setChats] = useState<ChatWithProfile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // チャットデータを取得する関数
  const fetchChatData = useCallback(async (participant: ConversationParticipants): Promise<ChatWithProfile | null> => {
    if (!currentProfile?.userId) return null;

    try {
      const conversation = await fetchConversation(participant.conversationId);
      if (!conversation) return null;

      const participants = await fetchConversationParticipants(participant.conversationId);
      if (!participants?.items) return null;

      const otherParticipant = participants.items.find(
        p => p && p.userId !== currentProfile.userId
      );
      if (!otherParticipant) return null;

      const friendRelation = await fetchFriend(
        currentProfile.userId,
        otherParticipant.userId
      );
      if (!friendRelation) return null;

      const friendProfile = await fetchProfile(
        otherParticipant.userId,
        friendRelation.friendProfileId
      );
      if (!friendProfile) return null;

      const messages = await fetchMessagesByConversationId(
        conversation.conversationId,
        1
      );
      const lastMessage = messages?.items?.[0] || undefined;

      return {
        conversation,
        profile: friendProfile,
        lastMessage
      };
    } catch (err) {
      console.error(`Error loading chat ${participant.conversationId}:`, err);
      return null;
    }
  }, [currentProfile?.userId]);

  // メインのデータ取得useEffect
  useEffect(() => {
    let mounted = true;

    const loadChats = async () => {
      if (!currentProfile?.userId) return;
      
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
  }, [currentProfile?.userId, fetchChatData]);

  // メッセージの作成を監視するサブスクリプション
  useEffect(() => {
    if (!currentProfile?.userId) return;

    const messageSubscription = client.graphql({
      query: onCreateMessages
    }).subscribe({
      next: async ({ data }) => {
        const newMessage = data.onCreateMessages;
        if (!newMessage) return;

        // 新しいメッセージを含むチャットを更新
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
      },
      error: (error) => {
        console.error('Message subscription error:', error);
      }
    });

    // 会話の更新を監視するサブスクリプション
    const conversationSubscription = client.graphql({
      query: onUpdateConversations
    }).subscribe({
      next: ({ data }) => {
        const updatedConversation = data.onUpdateConversations;
        if (!updatedConversation) return;

        // 更新された会話を含むチャットを更新
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
      },
      error: (error) => {
        console.error('Conversation subscription error:', error);
      }
    });

    // クリーンアップ関数
    return () => {
      messageSubscription.unsubscribe();
      conversationSubscription.unsubscribe();
    };
  }, [currentProfile?.userId]);

  // チャット選択のハンドラー
  const handleSelectChat = useCallback((friendId: string) => {
    router.push(`/dm/${friendId}`);
  }, [router]);

  return (
    <ChatListPresentation
      chats={chats}
      loading={loading || profileLoading}
      error={error}
      onSelectChat={handleSelectChat}
    />
  );
}