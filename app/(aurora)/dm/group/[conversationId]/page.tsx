'use client';

import { useParams } from 'next/navigation';
import { useProfileContext } from '../../../_containers/Profile/context';
import { ChatContainer } from '../../_containers/Chat/container';

export default function GroupChatPage() {
  const { currentProfile } = useProfileContext();
  const params = useParams();
  const conversationId = params.conversationId as string;

  if (!currentProfile?.userId) return null;

  return (
    <ChatContainer groupId={conversationId} />
  );
}
