'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatListPresentation } from './presentational';
import { useProfileContext } from '../../../_containers/Profile/context';
import { useConversations } from '@/_lib/hooks/useConversations';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import type { Conversations, Profiles } from '@/_lib/graphql/API';

export interface ChatWithProfile {
  conversation: Conversations;
  profile: Profiles;
}

export function ChatListContainer() {
  const router = useRouter();
  const { currentProfile, isLoading: profileLoading } = useProfileContext();
  const { 
    fetchConversationParticipantsByUserId, 
    fetchConversation 
  } = useConversations();
  const { fetchProfile } = useProfiles();
  
  const [chats, setChats] = useState<ChatWithProfile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChatsData() {
      if (!currentProfile?.userId) return;
      
      try {
        setError(null);
        const participations = await fetchConversationParticipantsByUserId(currentProfile.userId);
        
        if (!participations?.items) {
          throw new Error('チャット情報の取得に失敗しました');
        }

        const chatsWithProfiles = await Promise.all(
          participations.items
            .filter(p => p !== null)
            .map(async (participant) => {
              try {
                // 1. 会話を取得
                const conversation = await fetchConversation(participant!.conversationId);
                if (!conversation) return null;

                // 2. 他の参加者を取得
                const otherParticipationsResponse = await fetchConversationParticipantsByUserId(
                  participant!.conversationId
                );
                
                if (!otherParticipationsResponse?.items) return null;

                // 3. 現在のユーザー以外の参加者を見つける
                const otherParticipant = otherParticipationsResponse.items.find(
                  p => p && p.userId !== currentProfile.userId
                );

                if (!otherParticipant) return null;

                // 4. 相手のプロフィールを取得
                const friendProfile = await fetchProfile(
                  otherParticipant.userId,
                  otherParticipant.userId
                );

                if (!friendProfile) return null;

                return {
                  conversation,
                  profile: friendProfile
                };
              } catch (err) {
                console.error(`Error loading chat ${participant?.conversationId}:`, err);
                return null;
              }
            })
        );

        // null以外の結果のみをフィルタリング
        const validChats = chatsWithProfiles.filter((chat): chat is ChatWithProfile => chat !== null);
        setChats(validChats);
      } catch (err) {
        console.error('Error loading chats:', err);
        setError('チャット一覧の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    }

    loadChatsData();
  }, [
    currentProfile?.userId,
    fetchConversation,
    fetchConversationParticipantsByUserId,
    fetchProfile
  ]);

  const handleSelectChat = (friendId: string) => {
    router.push(`/dm/${friendId}`);
  };

  return (
    <ChatListPresentation
      chats={chats}
      loading={loading || profileLoading}
      error={error}
      onSelectChat={handleSelectChat}
    />
  );
}