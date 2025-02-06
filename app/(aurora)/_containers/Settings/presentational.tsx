'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/_components/ui/dialog';
import { cn } from '@/_lib/utils';
import type { Profiles } from '@/_lib/graphql/API';
import { TABS } from './constants';
import type { TabId } from './types';
import { ProfileTabContainer } from './ProfileTab/container';
import { UserContext } from '../User/context';
import { UserTabContainer } from './UserTab/container';

interface SettingsModalPresentationProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profiles;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  user:UserContext|null;
}

export function SettingsModalPresentation({
  isOpen,
  onClose,
  profile,
  activeTab,
  onTabChange,
  user,
}: SettingsModalPresentationProps) {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTabContainer currentProfile={profile} />;

      case 'account':
        return <UserTabContainer user={user} />;

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 gap-0 bg-black1 border-neutral-700">
        <div className='hidden'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </div>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-neutral-700 rounded-l-lg p-4 space-y-6 bg-gray4">
            <div className="">
              {user ? (
                <>
                  <p className='text-white1 font-semibold text-2xl'>{user.username}</p>
                  <p className='text-gray1 text-sm'>{user.mail}</p>
                </>
              ):(
                <p>ユーザー名</p>
              )}
            </div>
            <div className="space-y-1">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                    activeTab === tab.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-white1 hover:bg-neutral-700"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderTabContent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}