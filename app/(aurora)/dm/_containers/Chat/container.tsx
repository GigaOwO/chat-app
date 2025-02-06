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
  Profiles
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
    addConversation,
    fetchConversation
  } = useConversations();

  const [messages, setMessages] = useState<Messages[]>([]);
  const [friendProfile, setFriendProfile] = useState<Profiles | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 会話IDの取得または作成
  useEffect(() => {
    const initializeConversation = async () => {
      if (!currentProfile) return;

      try {
        // まず既存の会話を探す
        const participations = await fetchConversationParticipantsByUserId(currentProfile.userId);
        
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

            if (isMatch) {
              setConversationId(conversation.conversationId);
              return;
            }
          }
        }

        // 既存の会話が見つからない場合は新しく作成
        const newConversationId = uuidv4();
        const result = await addConversation({
          conversationId: newConversationId,
          type: ConversationType.DIRECT,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        if (result) {
          setConversationId(newConversationId);
        }
      } catch (err) {
        console.error('Error initializing conversation:', err);
        setError('会話の初期化に失敗しました');
      }
    };

    initializeConversation();
  }, [currentProfile, friendId, fetchConversationParticipantsByUserId, fetchConversation, addConversation]);

  // メッセージの取得
  useEffect(() => {
    const loadMessages = async () => {
      if (!conversationId) return;

      try {
        setLoading(true);
        const response = await fetchMessagesByConversationId(conversationId);
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
        setError('メッセージの読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [conversationId, fetchMessagesByConversationId]);

  // フレンドのプロフィール取得
  useEffect(() => {
    const loadFriendProfile = async () => {
      try {
        const profile = await fetchProfile(friendId, friendId);
        if (profile) {
          setFriendProfile(profile);
        }
      } catch (err) {
        console.error('Error loading friend profile:', err);
      }
    };

    loadFriendProfile();
  }, [friendId, fetchProfile]);

  // リアルタイム更新の購読
  useEffect(() => {
    if (!conversationId) return;

    // 新規メッセージの監視
    const createSubscription = client.graphql({
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
    const updateSubscription = client.graphql({
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

    return () => {
      createSubscription.unsubscribe();
      updateSubscription.unsubscribe();
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
      onSendMessage={handleSendMessage}
    />
  );
}