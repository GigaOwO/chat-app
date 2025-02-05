'use client';

import { Dialog, DialogContent } from '@/_components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_components/ui/tabs';
import { CreateFriendRequestForm } from './CreateFriendRequest/presentational';
import { FetchFriendRequest } from './FetchFriendRequest/presentational';
import type { FriendRequests } from '@/_lib/graphql/API';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

interface FriendsModalPresentationProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'requests' | 'search';
  onTabChange: (tab: 'requests' | 'search') => void;
  userId: string;
  username: string;
  profileId: string;
  initialRequests: FriendRequests[];
}

export function FriendsModalPresentation({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  userId,
  username,
  profileId,
  initialRequests
}: FriendsModalPresentationProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl h-[80vh] p-0 gap-0">
        <div className='hidden'> 
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={(value) => onTabChange(value as 'requests' | 'search')}
          className="w-full h-full"
        >
          <TabsList className="w-full justify-start rounded-none border-b">
            <TabsTrigger value="requests">フレンドリクエスト</TabsTrigger>
            <TabsTrigger value="search">フレンド検索</TabsTrigger>
          </TabsList>

          <div className="p-6 h-[calc(80vh-48px)] overflow-y-auto">
            <TabsContent value="requests" className="m-0">
              <FetchFriendRequest
                userId={userId}
                profileId={profileId}
                requests={initialRequests}
              />
            </TabsContent>

            <TabsContent value="search" className="m-0">
              <CreateFriendRequestForm
                senderId={userId}
                senderName={username}
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}