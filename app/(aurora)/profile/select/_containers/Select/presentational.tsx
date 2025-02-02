import { Card } from '@/_components/ui/card';
import { Profiles } from '@/_lib/graphql/API';
import Link from 'next/link';
import { getThemeColorFromCustomData } from '@/_lib/utils/theme';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { ProfileImage } from '@/_components/ProfileImage';
import { Avatar, AvatarFallback } from '@/_components/ui/avatar';

interface SelectProfilePresentationProps {
  profiles: Profiles[];
  isLoading: boolean;
  error: string | null;
  onSelect: (profileId: string) => Promise<void>;
}

export function SelectProfilePresentation({
  profiles,
  isLoading,
  error,
  onSelect
}: SelectProfilePresentationProps) {
  return (
    <Card className="w-full max-w-4xl p-6 bg-white">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">プロフィールを選択</h1>
          <p className="text-gray-500 mt-2">
            使用するプロフィールを選択してください
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {profiles.map((profile) => {
            const themeColor = getThemeColorFromCustomData(profile);
            
            return (
              <button
                key={profile.profileId}
                onClick={() => !isLoading && onSelect(profile.profileId)}
                disabled={isLoading}
                className={`
                  flex flex-col items-center p-4 rounded-lg
                  transition-all duration-300
                  hover:scale-105 focus:outline-none focus:ring-2
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                style={{ backgroundColor: themeColor }}
              >            
                <Avatar className="h-24 w-24">
                  {profile.avatarKey ? (
                    <ProfileImage
                      path={profile.avatarKey}
                      alt={profile.name}
                      fallbackText={profile.name.charAt(0).toUpperCase()}
                      width={96}
                      height={96}
                      className="rounded-full"
                      themeColor={themeColor}
                    />
                  ) : (
                    <AvatarFallback className='bg-zinc-700 text-zinc-100 text-xs'>
                      {profile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h3 className="font-medium text-white">{profile.name}</h3>
                {profile.bio && (
                  <p className="mt-1 text-sm text-white/80 text-center line-clamp-2">
                    {profile.bio}
                  </p>
                )}
              </button>
            );
          })}

          <Link
            href="/profile/create"
            className={`
              flex flex-col items-center p-4 rounded-lg bg-green-500
              transition-all duration-300 hover:bg-green-600
              hover:scale-105 focus:outline-none focus:ring-2
            `}
          >
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <span className="text-4xl text-white">+</span>
            </div>
            <span className="font-medium text-white">新規作成</span>
          </Link>
        </div>
      </div>
    </Card>
  );
}