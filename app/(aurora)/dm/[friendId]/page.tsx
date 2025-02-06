import { ChatContainer } from '../_containers/Chat/container';

interface DMPageProps {
  params: Promise<{ friendId: string }>;
}

export default async function DMPage({ params }: DMPageProps) {
  const { friendId } = await params;
  
  return <ChatContainer friendId={friendId} />;
}