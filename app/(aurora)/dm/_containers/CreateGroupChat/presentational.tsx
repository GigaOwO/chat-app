import { Button } from '@/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_components/ui/dialog';
import { ScrollArea } from '@/_components/ui/scroll-area';
import { Input } from '@/_components/ui/input';
import { Avatar, AvatarFallback } from '@/_components/ui/avatar';
import { ProfileImage } from '@/_components/ProfileImage';
import { getThemeColorFromCustomData } from '@/_lib/utils/theme';
import type { Profiles } from '@/_lib/graphql/API';
import { useState } from 'react';

interface CreateGroupChatPresentationProps {
  friends: Profiles[];
  isLoading: boolean;
  onCreateGroup: (name: string, memberIds: string[]) => void;
}

export function CreateGroupChatPresentation({
  friends,
  isLoading,
  onCreateGroup
}: CreateGroupChatPresentationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMembers.length === 0) return;
    
    onCreateGroup(
      groupName.trim() || `グループ (${selectedMembers.length + 1})`,
      selectedMembers
    );
    setIsOpen(false);
    setSelectedMembers([]);
    setGroupName('');
  };

  const toggleMember = (userId: string) => {
    setSelectedMembers((prev: string[]) =>
      prev.includes(userId)
        ? prev.filter((id: string) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full mb-2"
          size="sm"
          disabled={isLoading}
        >
          グループチャットを作成
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>グループチャットを作成</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="グループ名（任意）"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className="space-y-2">
            <p className="text-sm text-gray1">メンバーを選択</p>
            <ScrollArea className="h-64 rounded-md border p-2">
              <div className="space-y-2">
                {friends.map((friend) => {
                  const isSelected = selectedMembers.includes(friend.userId);
                  const themeColor = getThemeColorFromCustomData(friend);

                  return (
                    <button
                      key={friend.userId}
                      type="button"
                      onClick={() => toggleMember(friend.userId)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        isSelected ? 'bg-gray3' : 'hover:bg-gray3'
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        {friend.avatarKey ? (
                          <ProfileImage
                            path={friend.avatarKey}
                            alt={friend.name}
                            fallbackText={friend.name.charAt(0).toUpperCase()}
                            width={32}
                            height={32}
                            className="rounded-full"
                            themeColor={themeColor}
                          />
                        ) : (
                          <AvatarFallback
                            className="text-zinc-100"
                            style={{ backgroundColor: themeColor }}
                          >
                            {friend.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-sm">{friend.name}</span>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={selectedMembers.length === 0}
            >
              作成
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
