'use client';

import { Dialog, DialogContent } from '@/_components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_components/ui/tabs';
import { CreateFriendRequestForm } from './CreateFriendRequest/presentational';
import { FetchFriendRequest } from './FetchFriendRequest/presentational';
import type { FriendRequests } from '@/_lib/graphql/API';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { FetchFriend } from './FetchFriend/presentational';

interface FriendsModalPresentationProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'friend'|'requests' | 'search';
  onTabChange: (tab: 'friend' |'requests' | 'search') => void;
  userId: string;
  initialRequests: FriendRequests[];
}

export function FriendsModalPresentation({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  userId,
  initialRequests
}: FriendsModalPresentationProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl h-[80vh] p-0 gap-0 text-gray1">
        <div className='hidden'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={(value) => onTabChange(value as 'friend' |'requests' | 'search')}
          className="w-full h-full bg-black1 rounded-lg"
        >
          <TabsList className="w-full justify-start rounded-none border-b border-gray1 text-white">
            <TabsTrigger value="friend">フレンド一覧</TabsTrigger>
            <TabsTrigger value="requests">フレンドリクエスト</TabsTrigger>
            <TabsTrigger value="search">フレンド検索</TabsTrigger>
          </TabsList>

          <div className="p-6 h-[calc(80vh-48px)] overflow-y-auto">
          <TabsContent value="friend" className="m-0">
              <FetchFriend />
            </TabsContent>

            <TabsContent value="requests" className="m-0">
              <FetchFriendRequest
                userId={userId}
                requests={initialRequests}
              />
            </TabsContent>

            <TabsContent value="search" className="m-0">
              <CreateFriendRequestForm
                senderId={userId}
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}