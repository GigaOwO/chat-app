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
import { useRouter } from 'next/navigation';
import type { ExtendedParticipant } from './presentational';

const client = generateClient();

interface ChatContainerProps {
  friendId?: string;
  groupId?: string;
}

export function ChatContainer({ friendId, groupId }: ChatContainerProps) {
  const { currentProfile, isSwitching } = useProfileContext();
  const router = useRouter();
  const { fetchProfile, fetchProfilesByUserId } = useProfiles();
  const { fetchFriend } = useFriends();
  const { fetchMessagesByConversationId, addMessage } = useMessages();
  const {
    fetchConversationParticipantsByUserId,
    fetchConversationParticipants,
    addConversationParticipant,
  } = useConversationParticipants();
  const {
    addConversation,
    fetchConversation
  } = useConversations();

  const [messages, setMessages] = useState<Messages[]>([]);
  const [friendProfile, setFriendProfile] = useState<Profiles | null>(null);
  const [participants, setParticipants] = useState<ExtendedParticipant[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isGroup = !!groupId;

  // すべての初期化処理を一つのuseEffectにまとめる
  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      if (!currentProfile?.userId) return;
      if (!friendId && !groupId) return;

      try {
        if (isGroup) {
          // グループチャットの初期化
          setLoading(true);
          
          // 参加者情報を取得
          const participantsData = await fetchConversationParticipants(groupId);
          if (!participantsData?.items || !mounted) return;

          // 参加者のプロフィールを並列で取得
          const participantPromises = participantsData.items
            .filter(participant => participant !== null)
            .map(async participant => {
              const profiles = await fetchProfilesByUserId(participant!.userId);
              if (!profiles?.items?.[0]) return null;
              return {
                ...participant,
                lastReadAt: participant!.lastReadAt || null,
                profile: profiles.items[0]
              } as ExtendedParticipant;
            });

          // メッセージと参加者プロフィールを並列で取得
          const [messagesResponse, resolvedParticipants] = await Promise.all([
            fetchMessagesByConversationId(groupId),
            Promise.all(participantPromises)
          ]);

          if (!mounted) return;

          // 参加者リストをセット
          const validParticipants = resolvedParticipants.filter((p): p is ExtendedParticipant => p !== null);
          setParticipants(validParticipants);
          setConversationId(groupId);

          // メッセージをセット
          if (messagesResponse?.items) {
            setMessages(messagesResponse.items
              .filter((m): m is Messages => m !== null)
              .sort((a, b) => 
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
              )
            );
          }

        } else {
          // 1on1チャットの初期化
          const relation = await fetchFriend(currentProfile.userId, friendId!);
          if (!relation || !mounted) return;

          if(relation.userProfileId !== currentProfile.profileId) {
            router.push('/dm');
            return;
          }

          const profile = await fetchProfile(friendId!, relation.friendProfileId);
          if (!profile || !mounted) return;

          setFriendProfile(profile);

          // 会話を検索または作成
          const participations = await fetchConversationParticipantsByUserId(currentProfile.userId);
          if (!mounted) return;

          let chatId = null;

          if (participations?.items) {
            for (const participation of participations.items) {
              if (!participation) continue;
              
              const conversation = await fetchConversation(participation.conversationId);
              if (!conversation) continue;

              const otherParticipation = await fetchConversationParticipantsByUserId(friendId!);
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
                  userId: friendId!,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                })
              ]);

              chatId = newConversationId;
            }
          }

          // chatIdが取得できたらメッセージを取得
          if (chatId) {
            const messagesResponse = await fetchMessagesByConversationId(chatId);
            if (!mounted) return;
            if (messagesResponse?.items) {
              setMessages(messagesResponse.items
                .filter((m): m is Messages => m !== null)
                .sort((a, b) => 
                  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                )
              );
            }
          }

          if (!mounted) return;
          setConversationId(chatId);
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
  }, [currentProfile?.userId, friendId, groupId]);

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

  // プロファイル切り替え中は何もレンダリングしない
  if (isSwitching) {
    return null;
  }

  return (
    <ChatPresentation
      messages={messages}
      currentProfile={currentProfile}
      friendProfile={friendProfile}
      participants={participants}
      loading={loading}
      error={error}
      isSwitching={isSwitching}
      isGroup={isGroup}
      onSendMessage={handleSendMessage}
    />
  );
}
