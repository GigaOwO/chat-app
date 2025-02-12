'use client';

import { useState, useEffect } from 'react';
import { CreateGroupChatPresentation } from './presentational';
import { useProfileContext } from '../../../_containers/Profile/context';
import { useFriends } from '@/_lib/hooks/useFriends';
import { useConversations } from '@/_lib/hooks/useConversations';
import { useConversationParticipants } from '@/_lib/hooks/useConversationParticipants';
import { useProfiles } from '@/_lib/hooks/useProfiles';
import { 
  ConversationType, 
  Profiles
} from '@/_lib/graphql/API';
import { v4 as uuidv4 } from 'uuid';

export function CreateGroupChatContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentProfile } = useProfileContext();
  const { fetchFriendsByUserProfileId } = useFriends();
  const { addConversation } = useConversations();
  const { addConversationParticipant } = useConversationParticipants();
  const { fetchProfile } = useProfiles();
  const [friends, setFriends] = useState<Profiles[]>([]);
  
  // フレンドリストの取得
  useEffect(() => {
    const loadFriends = async () => {
      if (!currentProfile?.profileId) return;
      
      try {
        const response = await fetchFriendsByUserProfileId(currentProfile.profileId);
        if (!response?.items) return;

        // フレンドのプロフィール情報を取得
        const profiles = await Promise.all(
          response.items
            .filter(f => f !== null && f.status === 'ACTIVE')
            .map(async f => {
              if (!f) return null;
              return await fetchProfile(f.friendId, f.friendProfileId);
            })
        );

        setFriends(profiles.filter((p): p is Profiles => p !== null));
      } catch (err) {
        console.error('Error loading friends:', err);
      }
    };

    loadFriends();
  }, [currentProfile?.profileId, fetchFriendsByUserProfileId, fetchProfile]);

  // グループチャット作成
  const handleCreateGroup = async (name: string, memberIds: string[]) => {
    if (!currentProfile?.userId) return;
    
    setIsLoading(true);
    try {
      // 会話を作成
      const conversationId = uuidv4();
      const conversation = await addConversation({
        conversationId,
        type: ConversationType.GROUP,
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastMessageAt: new Date().toISOString()
      });
      
      if (!conversation) throw new Error('Failed to create conversation');

      // 参加者を追加（自分含む）
      const participants = [currentProfile.userId, ...memberIds];
      await Promise.all(
        participants.map(userId =>
          addConversationParticipant({
            conversationId: conversation.conversationId,
            userId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        )
      );
    } catch (err) {
      console.error('Error creating group chat:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CreateGroupChatPresentation
      friends={friends}
      isLoading={isLoading}
      onCreateGroup={handleCreateGroup}
    />
  );
}
