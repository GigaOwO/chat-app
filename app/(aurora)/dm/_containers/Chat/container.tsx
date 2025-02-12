'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { ChatPresentation } from './presentational';
import { useProfileContext } from '../../../_containers/Profile/context';
import { useMessages } from '@/_lib/hooks/useMessages';
import { useConversations } from '@/_lib/hooks/useConversations';
import { useFriends } from '@/_lib/hooks/useFriends';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import { 
  Messages, 
  ConversationType,
  MessageType,
  MessageStatus,
  Profiles,
} from '@/_lib/graphql/API';
import { v4 as uuidv4 } from 'uuid';
import { onCreateMessages, onUpdateMessages } from '@/_lib/graphql/subscriptions';
import { useConversationParticipants } from '@/_lib/hooks/useConversationParticipants';

const client = generateClient();

interface ChatContainerProps {
  friendId: string;
}

export function ChatContainer({ friendId }: ChatContainerProps) {
  const { currentProfile, isSwitching } = useProfileContext();
  const { fetchProfile } = useProfiles();
  const { fetchFriend } = useFriends();
  const { fetchMessagesByConversationId, addMessage } = useMessages();
  const {
    fetchConversationParticipantsByUserId,
    addConversationParticipant,
  } = useConversationParticipants();
  const {
    addConversation,
    fetchConversation
  } = useConversations();

  const [messages, setMessages] = useState<Messages[]>([]);
  const [friendProfile, setFriendProfile] = useState<Profiles | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // すべての初期化処理を一つのuseEffectにまとめる
  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      if (!currentProfile?.userId || !friendId) return;

      try {
        // 1. フレンド関係とプロフィールの取得
        const relation = await fetchFriend(currentProfile.userId, friendId);
        if (!relation || !mounted) return;
        
        const profile = await fetchProfile(friendId, relation.friendProfileId);
        if (!profile || !mounted) return;

        setFriendProfile(profile);

        // 2. 会話の初期化
        const participations = await fetchConversationParticipantsByUserId(currentProfile.userId);
        if (!mounted) return;

        let chatId = null;

        if (participations?.items) {
          for (const participation of participations.items) {
            if (!participation) continue;
            
            const conversation = await fetchConversation(participation.conversationId);
            if (!conversation) continue;

            const otherParticipation = await fetchConversationParticipantsByUserId(friendId);
            if (!otherParticipation?.items) continue;

            const isMatch = otherParticipation.items.some(
              p => p?.conversationId === participation.conversationId
            );

            if (isMatch) {
              chatId = conversation.conversationId;
              break;
            }
          }
        }

        if (!chatId) {
          // 新しい会話を作成
          const newConversationId = uuidv4();
          const result = await addConversation({
            conversationId: newConversationId,
            type: ConversationType.DIRECT,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });

          if (result) {
            await Promise.all([
              addConversationParticipant({
                conversationId: newConversationId,
                userId: currentProfile.userId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }),
              addConversationParticipant({
                conversationId: newConversationId,
                userId: friendId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              })
            ]);

            chatId = newConversationId;
          }
        }

        if (!mounted) return;
        setConversationId(chatId);

        // 3. メッセージの取得
        if (chatId) {
          const response = await fetchMessagesByConversationId(chatId);
          if (!mounted) return;
          
          if (response?.items) {
            setMessages(response.items
              .filter((m): m is Messages => m !== null)
              .sort((a, b) => 
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
              )
            );
          }
        }

        setError(null);
      } catch (err) {
        console.error('Error initializing chat:', err);
        if (mounted) {
          setError('チャットの初期化に失敗しました');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [currentProfile?.userId, friendId]);

  // リアルタイム更新のサブスクリプション
  useEffect(() => {
    if (!conversationId) return;

    const subscriptions = [
      client.graphql({ query: onCreateMessages }).subscribe({
        next: ({ data }) => {
          const newMessage = data.onCreateMessages;
          if (newMessage?.conversationId === conversationId) {
            setMessages(prev => [...prev, newMessage]);
          }
        },
        error: (error) => console.error('Subscription error:', error)
      }),

      client.graphql({ query: onUpdateMessages }).subscribe({
        next: ({ data }) => {
          const updatedMessage = data.onUpdateMessages;
          if (updatedMessage?.conversationId === conversationId) {
            setMessages(prev =>
              prev.map(msg =>
                msg.messageId === updatedMessage.messageId ? updatedMessage : msg
              )
            );
          }
        },
        error: (error) => console.error('Update subscription error:', error)
      })
    ];

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [conversationId]);

  const handleSendMessage = async (content: string) => {
    if (!currentProfile || !conversationId) return;

    try {
      const messageId = uuidv4();
      const result = await addMessage({
        messageId,
        conversationId,
        senderId: currentProfile.userId,
        content,
        type: MessageType.TEXT,
        status: MessageStatus.SENT,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      if (!result) {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('メッセージの送信に失敗しました');
    }
  };

  return (
    <ChatPresentation
      messages={messages}
      currentProfile={currentProfile}
      friendProfile={friendProfile}
      loading={loading}
      error={error}
      isSwitching={isSwitching}
      onSendMessage={handleSendMessage}
    />
  );
}