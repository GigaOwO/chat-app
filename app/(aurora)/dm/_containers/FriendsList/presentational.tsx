import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import { ScrollArea } from '@/_components/ui/scroll-area';
import { Skeleton } from '@/_components/ui/skeleton';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { ProfileImage } from '@/_components/ProfileImage';
import { getThemeColorFromCustomData } from '@/_lib/utils/theme';
import type { Friends, Profiles } from '@/_lib/graphql/API';

interface FriendsListPresentationProps {
  friends: Array<{ friend: Friends; profile: Profiles }>;
  loading: boolean;
  error: string | null;
  onSelectFriend: (friendId: string) => void;
}

export function FriendsListPresentation({
  friends,
  loading,
  error,
  onSelectFriend
}: FriendsListPresentationProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 p-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-32" />
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

  if (friends.length === 0) {
    return (
      <div className="text-center text-gray1 py-4">
        フレンドがいません
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-1">
        {friends.map(({ friend, profile }) => {
          const themeColor = getThemeColorFromCustomData(profile);
          
          return (
            <button
              key={friend.friendId}
              onClick={() => onSelectFriend(friend.friendId)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray3 transition-colors"
            >
              <Avatar className="h-10 w-10">
                {profile.avatarKey ? (
                  <ProfileImage
                    path={profile.avatarKey}
                    alt={profile.name}
                    fallbackText={profile.name.charAt(0).toUpperCase()}
                    width={40}
                    height={40}
                    className="rounded-full"
                    themeColor={themeColor}
                  />
                ) : (
                  <AvatarFallback 
                    className="text-zinc-100"
                    style={{ backgroundColor: themeColor }}
                  >
                    {profile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm font-medium text-white1 text-left">
                {profile.name}
              </span>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}