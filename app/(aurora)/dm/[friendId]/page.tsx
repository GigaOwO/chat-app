import { ChatContainer } from '../_containers/Chat/container';

interface DMPageProps {
  params: {
    friendId: string;
  };
}

export default function DMPage({ params }: DMPageProps) {
  return <ChatContainer friendId={params.friendId} />;
}