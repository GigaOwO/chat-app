'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { ChatPresentation } from './presentational';
import { useProfileContext } from '../../../_containers/Profile/context';
import { useMessages } from '@/_lib/hooks/useMessages';
import { useConversations } from '@/_lib/hooks/useConversations';
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

const client = generateClient();

interface ChatContainerProps {
  friendId: string;
}

export function ChatContainer({ friendId }: ChatContainerProps) {
  const { currentProfile } = useProfileContext();
  const { fetchProfile } = useProfiles();
  const { 
    fetchMessagesByConversationId,
    addMessage 
  } = useMessages();
  const { 
    fetchConversationParticipantsByUserId,
    addConversationParticipant,
    addConversation,
    fetchConversation
  } = useConversations();

  const [messages, setMessages] = useState<Messages[]>([]);
  const [friendProfile, setFriendProfile] = useState<Profiles | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initComplete, setInitComplete] = useState(false);

  // フレンドのプロフィール取得
  useEffect(() => {
    let isMounted = true;

    const loadFriendProfile = async () => {
      if (!friendId) return;

      try {
        const profile = await fetchProfile(friendId, friendId);
        if (profile && isMounted) {
          setFriendProfile(profile);
        }
      } catch (err) {
        console.error('Error loading friend profile:', err);
        if (isMounted) {
          setError('プロフィールの読み込みに失敗しました');
        }
      }
    };

    loadFriendProfile();
    return () => { isMounted = false; };
  }, [friendId, fetchProfile]);

  // 会話IDの取得または作成
  useEffect(() => {
    let isMounted = true;

    const initializeConversation = async () => {
      if (!currentProfile?.userId) return;

      try {
        setLoading(true);
        setError(null);
        // まず既存の会話を探す
        const participations = await fetchConversationParticipantsByUserId(currentProfile.userId);
        
        if (!isMounted) return;

        if (participations?.items) {
          for (const participation of participations.items) {
            if (!participation) continue;
            
            const conversation = await fetchConversation(participation.conversationId);
            if (!conversation) continue;

            // 1対1のDMで、相手が参加している会話を探す
            const otherParticipation = await fetchConversationParticipantsByUserId(friendId);
            if (!otherParticipation?.items) continue;

            const isMatch = otherParticipation.items.some(
              p => p?.conversationId === participation.conversationId
            );

            if (isMatch && isMounted) {
              setConversationId(conversation.conversationId);
              return;
            }
          }
        }

        if (!isMounted) return;

        // 既存の会話が見つからない場合は新しく作成
        const newConversationId = uuidv4();
        const result = await addConversation({
          conversationId: newConversationId,
          type: ConversationType.DIRECT,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        if (result && isMounted) {
          // 参加者を追加
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

          setConversationId(newConversationId);
        }
      } catch (err) {
        console.error('Error initializing conversation:', err);
        if (isMounted) {
          setError('会話の初期化に失敗しました');
        }
      } finally {
        if (isMounted) {
          setInitComplete(true);
          setLoading(false);
        }
      }
    };

    if (currentProfile) {
      initializeConversation();
    }
    
    return () => { isMounted = false; };
  }, [currentProfile?.userId, friendId]);

  // メッセージの取得
  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      if (!conversationId) return;

      try {
        setLoading(true);
        const response = await fetchMessagesByConversationId(conversationId);
        
        if (!isMounted) return;

        if (response?.items) {
          setMessages(response.items
            .filter((m): m is Messages => m !== null)
            .sort((a, b) => 
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            )
          );
        }
      } catch (err) {
        console.error('Error loading messages:', err);
        if (isMounted) {
          setError('メッセージの読み込みに失敗しました');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMessages();
    return () => { isMounted = false; };
  }, [conversationId, fetchMessagesByConversationId]);

  // リアルタイム更新のサブスクリプション
  useEffect(() => {
    if (!conversationId) return;

    let createSubscription: { unsubscribe: () => void } | null = null;
    let updateSubscription: { unsubscribe: () => void } | null = null;

    const setupSubscriptions = () => {
      // 新規メッセージの監視
      createSubscription = client.graphql({
        query: onCreateMessages
      }).subscribe({
        next: ({ data }) => {
          const newMessage = data.onCreateMessages;
          if (newMessage?.conversationId === conversationId) {
            setMessages(prev => [...prev, newMessage]);
          }
        },
        error: (error) => {
          console.error('Subscription error:', error);
        }
      });

      // メッセージ更新の監視
      updateSubscription = client.graphql({
        query: onUpdateMessages
      }).subscribe({
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
        error: (error) => {
          console.error('Update subscription error:', error);
        }
      });
    };

    setupSubscriptions();

    return () => {
      if (createSubscription) {
        createSubscription.unsubscribe();
      }
      if (updateSubscription) {
        updateSubscription.unsubscribe();
      }
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

  // 初期化が完了していない、かつプロフィールが存在しない場合はローディング表示
  if (!initComplete && !currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray1">Loading...</p>
      </div>
    );
  }

  return (
    <ChatPresentation
      messages={messages}
      currentProfile={currentProfile}
      friendProfile={friendProfile}
      loading={loading}
      error={error}
      onSendMessage={handleSendMessage}
    />
  );
}