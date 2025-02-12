import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import { ScrollArea } from '@/_components/ui/scroll-area';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { ProfileImage } from '@/_components/ProfileImage';
import { MessageInput } from './MessageInput';
import { Skeleton } from '@/_components/ui/skeleton';
import { getThemeColorFromCustomData } from '@/_lib/utils/theme';
import type { Messages, Profiles } from '@/_lib/graphql/API';

export type ExtendedParticipant = {
  __typename: "ConversationParticipants";
  conversationId: string;
  userId: string;
  lastReadAt: string | null;
  createdAt: string;
  updatedAt: string;
  profile: Profiles | null;
};

interface ChatPresentationProps {
  messages: Messages[];
  currentProfile: Profiles | null;
  friendProfile?: Profiles | null;
  participants?: ExtendedParticipant[];
  loading: boolean;
  error: string | null;
  isSwitching: boolean;
  isGroup?: boolean;
  onSendMessage: (content: string) => Promise<void>;
}

// メッセージ内容の表示用コンポーネント
function MessageContent({ content }: { content: string }) {
  return (
    <>
      {content.split('\n').map((line, index, array) => (
        <React.Fragment key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}

export function ChatPresentation({
  messages,
  currentProfile,
  friendProfile,
  participants,
  loading,
  error,
  isSwitching,
  isGroup,
  onSendMessage
}: ChatPresentationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージが来たら自動スクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // ローディング中の表示
  if ((loading && !messages.length) || isSwitching) {
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

  // プロフィールや参加者情報が存在しない場合の表示
  if (!currentProfile || (!isGroup && !friendProfile) || (isGroup && !participants?.length)) {
    // ローディング中は表示しない
    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
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
      );
    }

    // データ取得完了後にエラーを表示
    return (
      <div className="flex-1 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            {isGroup ? "グループメンバーの読み込みに失敗しました" : "プロフィールの読み込みに失敗しました"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const headerThemeColor = isGroup ? '#1f2937' : (friendProfile ? getThemeColorFromCustomData(friendProfile) : '#6b7280');

  return (
    <div className="flex flex-col h-full">
      {/* ヘッダー */}
      <div
        className="p-4 border-b border-gray2 flex items-center gap-3"
        style={{ backgroundColor: headerThemeColor }}
      >
        <Avatar className="h-10 w-10">
          {isGroup ? (
            <AvatarFallback className="text-zinc-100 bg-gray1">
              G
            </AvatarFallback>
          ) : friendProfile?.avatarKey ? (
            <ProfileImage
              path={friendProfile.avatarKey}
              alt={friendProfile.name}
              fallbackText={friendProfile.name.charAt(0).toUpperCase()}
              width={40}
              height={40}
              className="rounded-full"
              themeColor={headerThemeColor}
            />
          ) : (
            <AvatarFallback
              className="text-zinc-100"
              style={{ backgroundColor: headerThemeColor }}
            >
              {friendProfile?.name.charAt(0).toUpperCase() || '?'}
            </AvatarFallback>
          )}
        </Avatar>
        <span className="font-medium text-white1">
          {isGroup
            ? participants?.map((p: ExtendedParticipant) => p.profile?.name).join(', ')
            : friendProfile?.name}
        </span>
      </div>

      {/* メッセージエリア */}
      <ScrollArea 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray1 py-4">
            メッセージはありません
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUser = message.senderId === currentProfile.userId;
              const messageProfile = isGroup
                ? participants?.find((p: ExtendedParticipant) => p.profile?.userId === message.senderId)?.profile
                : (isCurrentUser ? currentProfile : friendProfile);
              const themeColor = messageProfile ? getThemeColorFromCustomData(messageProfile) : '#6b7280';

              return (
                <div
                  key={message.messageId}
                  className={`flex items-start gap-2 ${
                    isCurrentUser ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    {messageProfile?.avatarKey ? (
                      <ProfileImage
                        path={messageProfile.avatarKey}
                        alt={messageProfile.name}
                        fallbackText={messageProfile.name.charAt(0).toUpperCase()}
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
                        {messageProfile?.name.charAt(0).toUpperCase() || '?'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className={`space-y-1 max-w-[70%] ${
                    isCurrentUser ? 'items-end' : ''
                  }`}>
                    <div className="flex items-center gap-2">
                      {isGroup && (
                        <span className="text-xs text-gray1">
                          {messageProfile?.name || '不明なユーザー'}
                        </span>
                      )}
                      <span className="text-xs text-gray1">
                        {new Date(message.createdAt).toLocaleString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div
                      className={`rounded-lg p-2 whitespace-pre-wrap break-words ${
                        isCurrentUser
                          ? 'text-white ml-auto'
                          : 'text-white1'
                      }`}
                    >
                      <MessageContent content={message.content} />
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
