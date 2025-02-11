import { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import { ScrollArea } from '@/_components/ui/scroll-area';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { ProfileImage } from '@/_components/ProfileImage';
import { MessageInput } from './MessageInput';
import { Skeleton } from '@/_components/ui/skeleton';
import { getThemeColorFromCustomData } from '@/_lib/utils/theme';
import type { Messages, Profiles } from '@/_lib/graphql/API';

interface ChatPresentationProps {
  messages: Messages[];
  currentProfile: Profiles | null;
  friendProfile: Profiles | null;
  loading: boolean;
  error: string | null;
  onSendMessage: (content: string) => Promise<void>;
}

export function ChatPresentation({
  messages,
  currentProfile,
  friendProfile,
  loading,
  error,
  onSendMessage
}: ChatPresentationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージが来たら自動スクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ローディング中の表示
  if (loading && !messages.length) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray2 flex items-center gap-3 bg-gray3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-16 w-64" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // エラーの表示
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // プロフィールが存在しない場合のエラー表示
  if (!currentProfile || !friendProfile) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>プロフィールの読み込みに失敗しました</AlertDescription>
        </Alert>
      </div>
    );
  }

  const friendThemeColor = getThemeColorFromCustomData(friendProfile);

  return (
    <div className="flex flex-col h-full">
      {/* ヘッダー */}
      <div 
        className="p-4 border-b border-gray2 flex items-center gap-3"
        style={{ backgroundColor: friendThemeColor }}
      >
        <Avatar className="h-10 w-10">
          {friendProfile.avatarKey ? (
            <ProfileImage
              path={friendProfile.avatarKey}
              alt={friendProfile.name}
              fallbackText={friendProfile.name.charAt(0).toUpperCase()}
              width={40}
              height={40}
              className="rounded-full"
              themeColor={friendThemeColor}
            />
          ) : (
            <AvatarFallback 
              className="text-zinc-100"
              style={{ backgroundColor: friendThemeColor }}
            >
              {friendProfile.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <span className="font-medium text-white1">{friendProfile.name}</span>
      </div>

      {/* メッセージエリア */}
      <ScrollArea 
        ref={scrollRef}
        className="flex-1 p-4"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray1 py-4">
            メッセージはありません
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUser = message.senderId === currentProfile.userId;
              const profile = isCurrentUser ? currentProfile : friendProfile;
              const themeColor = getThemeColorFromCustomData(profile);

              return (
                <div
                  key={message.messageId}
                  className={`flex items-start gap-2 ${
                    isCurrentUser ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    {profile.avatarKey ? (
                      <ProfileImage
                        path={profile.avatarKey}
                        alt={profile.name}
                        fallbackText={profile.name.charAt(0).toUpperCase()}
                        width={32}
                        height={32}
                        className="rounded-full"
                        themeColor={themeColor}
                      />
                    ) : (
                      <AvatarFallback 
                        className="text-zinc-100 text-xs"
                        style={{ backgroundColor: themeColor }}
                      >
                        {profile.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className={`space-y-1 max-w-[70%] ${
                    isCurrentUser ? 'items-end' : ''
                  }`}>
                    <span className="text-xs text-gray1">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                    <div
                      className={`rounded-lg p-3 ${
                        isCurrentUser
                          ? 'bg-blue-600 text-white ml-auto'
                          : 'bg-gray2 text-white1'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* メッセージ入力 */}
      <div className="p-4 border-t border-gray2">
        <MessageInput onSend={onSendMessage} />
      </div>
    </div>
  );
}