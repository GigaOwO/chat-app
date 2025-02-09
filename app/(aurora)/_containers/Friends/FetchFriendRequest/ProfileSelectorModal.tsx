import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/_components/ui/dialog';
import { Button } from '@/_components/ui/button';
import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import { useState } from 'react';
import { ProfileImage } from '@/_components/ProfileImage';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import type { Profiles } from '@/_lib/graphql/API';
import { getThemeColorFromCustomData } from '@/_lib/utils/theme';

interface ProfileSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Profiles[];
  onSelect: (profileId: string) => void;
  loading?: boolean;
  error?: string | null;
}

export function ProfileSelectorModal({
  isOpen,
  onClose,
  profiles,
  onSelect,
  loading = false,
  error = null
}: ProfileSelectorModalProps) {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const handleSelect = () => {
    if (selectedProfileId) {
      onSelect(selectedProfileId);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl text-white bg-gray3 border-[2px] border-gray3 rounded-lg">
        <DialogHeader>
          <DialogTitle>フレンドになるプロファイルを選択</DialogTitle>
        </DialogHeader>
        <div className='hidden'>
          <DialogDescription></DialogDescription>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-4 my-4">
          {profiles.map((profile) => {
            const themeColor = getThemeColorFromCustomData(profile);
            const isSelected = selectedProfileId === profile.profileId;
            
            return (
              <button
                key={profile.profileId}
                onClick={() => setSelectedProfileId(profile.profileId)}
                className={`
                  flex items-center gap-4 p-4 rounded-lg transition-all ring-2
                  ${isSelected ? 'ring-white1' : 'ring-gray5'}
                `}
                style={{ backgroundColor: themeColor }}
              >
                <Avatar className="h-12 w-12">
                  {profile.avatarKey ? (
                    <ProfileImage
                      path={profile.avatarKey}
                      alt={profile.name}
                      fallbackText={profile.name.charAt(0).toUpperCase()}
                      width={48}
                      height={48}
                      className="rounded-full"
                      themeColor={themeColor}
                    />
                  ) : (
                    <AvatarFallback
                      className="text-lg"
                      style={{ backgroundColor: themeColor }}
                    >
                      {profile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="text-left">
                  <h4 className="font-medium">{profile.name}</h4>
                  {profile.bio && (
                    <p className="text-sm text-gray-500 truncate">
                      {profile.bio}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className='text-gray3 bg-white hover:bg-white1'
          >
            キャンセル
          </Button>
          <Button
            onClick={handleSelect}
            disabled={!selectedProfileId || loading}
            className='text-white1 bg-gray4 hover:bg-gray6'
          >
            {loading ? '処理中...' : '選択して承認'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileSelectorModal;