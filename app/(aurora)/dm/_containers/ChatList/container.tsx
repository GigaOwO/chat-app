'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChatListPresentation } from './presentational';
import { useProfileContext } from '../../../_containers/Profile/context';
import { useConversations } from '@/_lib/hooks/useConversations';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import { useFriends } from '@/_lib/hooks/useFriends';
import { generateClient } from 'aws-amplify/api';
import { 
  onCreateMessages, 
  onUpdateConversations 
} from '@/_lib/graphql/subscriptions';
import type { Conversations, Profiles, Messages } from '@/_lib/graphql/API';

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
  const { 
    fetchConversationParticipantsByUserId, 
    fetchConversation 
  } = useConversations();
  const { fetchProfile } = useProfiles();
  const { fetchFriend } = useFriends();
  
  const [chats, setChats] = useState<ChatWithProfile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // チャットデータを取得する関数
  const fetchChatData = useCallback(async (
    participantId: string, 
    conversationId: string,
    currentUserId: string
  ) => {
    try {
      // 1. 会話を取得
      const conversation = await fetchConversation(conversationId);
      if (!conversation) return null;

      // 2. 他の参加者を取得
      const otherParticipationsResponse = await fetchConversationParticipantsByUserId(
        conversationId
      );
      
      if (!otherParticipationsResponse?.items) return null;

      const otherParticipant = otherParticipationsResponse.items.find(
        p => p && p.userId !== currentUserId
      );

      if (!otherParticipant) return null;

      // 3. フレンド関係を取得
      const friendRelation = await fetchFriend(currentUserId, otherParticipant.userId);
      if (!friendRelation) return null;

      // 4. 相手のプロフィールを取得
      const friendProfile = await fetchProfile(
        otherParticipant.userId,
        friendRelation.friendProfileId
      );

      if (!friendProfile) return null;

      return {
        conversation,
        profile: friendProfile
      };
    } catch (err) {
      console.error(`Error loading chat ${conversationId}:`, err);
      return null;
    }
  }, []);

  // チャットリストの初期読み込み
  useEffect(() => {
    let mounted = true;

    const loadChats = async () => {
      if (!currentProfile?.userId) return;
      
      try {
        setError(null);
        const participations = await fetchConversationParticipantsByUserId(currentProfile.userId);
        
        if (!participations?.items || !mounted) return;

        const chatPromises = participations.items
          .filter(p => p !== null)
          .map(participant => 
            fetchChatData(
              participant!.userId, 
              participant!.conversationId, 
              currentProfile.userId
            )
          );

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

  // サブスクリプションの設定
  useEffect(() => {
    if (!currentProfile?.userId) return;

    const messageSubscription = client.graphql({
      query: onCreateMessages
    }).subscribe({
      next: ({ data }) => {
        const newMessage = data.onCreateMessages;
        if (!newMessage) return;

        setChats(prevChats => {
          const updatedChats = prevChats.map(chat => {
            if (chat.conversation.conversationId === newMessage.conversationId) {
              return {
                ...chat,
                lastMessage: newMessage,
                conversation: {
                  ...chat.conversation,
                  lastMessageAt: newMessage.createdAt
                }
              };
            }
            return chat;
          });
          return sortChatsByLastMessage(updatedChats);
        });
      },
      error: (error) => {
        console.error('Message subscription error:', error);
      }
    });

    const conversationSubscription = client.graphql({
      query: onUpdateConversations
    }).subscribe({
      next: ({ data }) => {
        const updatedConversation = data.onUpdateConversations;
        if (!updatedConversation) return;

        setChats(prevChats => {
          const updatedChats = prevChats.map(chat => {
            if (chat.conversation.conversationId === updatedConversation.conversationId) {
              return {
                ...chat,
                conversation: updatedConversation
              };
            }
            return chat;
          });
          return sortChatsByLastMessage(updatedChats);
        });
      },
      error: (error) => {
        console.error('Conversation subscription error:', error);
      }
    });

    return () => {
      messageSubscription.unsubscribe();
      conversationSubscription.unsubscribe();
    };
  }, [currentProfile?.userId]);

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