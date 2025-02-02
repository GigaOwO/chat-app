'use client';

import { Dialog, DialogContent } from '@/_components/ui/dialog';
import { cn } from '@/_lib/utils';
import type { Profiles } from '@/_lib/graphql/API';
import { TABS } from './constants';
import type { TabId } from './types';
import { ProfileTabContainer } from './ProfileTab/container';

interface SettingsModalPresentationProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profiles;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function SettingsModalPresentation({
  isOpen,
  onClose,
  profile,
  activeTab,
  onTabChange
}: SettingsModalPresentationProps) {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTabContainer currentProfile={profile} />;

      case 'general':
        return (
          <div className="p-6">
            <p className="text-gray-500">準備中...</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 gap-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4 space-y-6">
            <div className="space-y-1">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                    activeTab === tab.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
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