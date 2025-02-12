import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import { ScrollArea } from '@/_components/ui/scroll-area';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { ProfileImage } from '@/_components/ProfileImage';
import { getThemeColorFromCustomData } from '@/_lib/utils/theme';
import type { ChatWithProfile } from './container';
import type { Profiles } from '@/_lib/graphql/API';

interface ChatListPresentationProps {
  chats: ChatWithProfile[];
  loading: boolean;
  error: string | null;
  onSelectChat: (conversationId: string) => void;
}

interface GroupAvatarsProps {
  participants: Profiles[];
  size?: number;
}

function GroupAvatars({ participants, size = 24 }: GroupAvatarsProps) {
  const displayParticipants = participants.slice(0, 4);
  const avatarSize = size * 0.8;

  return (
    <div className="relative h-10 w-10">
      {displayParticipants.map((participant, index) => {
        const themeColor = getThemeColorFromCustomData(participant);

        return (
          <Avatar
            key={participant.userId}
            className="absolute"
            style={{
              height: `${avatarSize}px`,
              width: `${avatarSize}px`,
              top: index < 2 ? 0 : `${avatarSize/2}px`,
              left: index % 2 === 0 ? 0 : `${avatarSize/2}px`,
              zIndex: index
            }}
          >
            {participant.avatarKey ? (
              <ProfileImage
                path={participant.avatarKey}
                alt={participant.name}
                fallbackText={participant.name.charAt(0).toUpperCase()}
                width={avatarSize}
                height={avatarSize}
                className="rounded-full"
                themeColor={themeColor}
              />
            ) : (
              <AvatarFallback
                className="text-[10px] text-zinc-100"
                style={{ backgroundColor: themeColor }}
              >
                {participant.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        );
      })}
    </div>
  );
}

export function ChatListPresentation({
  chats,
  loading,
  error,
  onSelectChat
}: ChatListPresentationProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 p-2">
            <div className="h-10 w-10 rounded-full bg-gray2 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-gray2 animate-pulse" />
              <div className="h-3 w-24 bg-gray2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="text-center text-gray1 py-4">
        チャットがありません
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1">
        {chats.map((chat) => {
          const { conversation, profile, lastMessage, isGroup, participants, groupName } = chat;
          const messagePreview = lastMessage?.content || '新しい会話を始めましょう';
          
          return (
            <button
              key={conversation.conversationId}
              onClick={() => onSelectChat(conversation.conversationId)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray3 transition-colors"
            >
              {isGroup && participants ? (
                <GroupAvatars participants={participants} />
              ) : (
                <Avatar className="h-10 w-10 flex-shrink-0">
                  {profile.avatarKey ? (
                    <ProfileImage
                      path={profile.avatarKey}
                      alt={profile.name}
                      fallbackText={profile.name.charAt(0).toUpperCase()}
                      width={40}
                      height={40}
                      className="rounded-full"
                      themeColor={getThemeColorFromCustomData(profile)}
                    />
                  ) : (
                    <AvatarFallback 
                      className="text-zinc-100"
                      style={{ backgroundColor: getThemeColorFromCustomData(profile) }}
                    >
                      {profile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              )}
              <div className="flex-1 text-left space-y-1 min-w-0 overflow-hidden">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm font-medium text-white1 truncate flex-shrink">
                    {isGroup ? groupName : profile.name}
                  </span>
                  {lastMessage && (
                    <span className="text-xs text-gray1 whitespace-nowrap flex-shrink-0">
                      {new Date(lastMessage.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray1 truncate">
                  {messagePreview}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
