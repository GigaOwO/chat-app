import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/_components/ui/dialog';
import { cn } from '@/_lib/utils';
import { Button } from '@/_components/ui/button';
import { Profiles } from '@/_lib/graphql/API';
import { useProfiles } from '@/(aurora)/_hooks/Profiles/useProfiles';
import { Input } from '@/_components/ui/input';
import { ThemeColorPicker } from '@/(aurora)/dm/_components/ThemeColorPicker';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profiles;
}

interface TabContentProps {
  profile: Profiles;
  onClose: () => void;
}

const tabs = [
  { id: 'general', label: '一般', icon: '/settings/general.svg' },
  { id: 'profile', label: 'プロフィール', icon: '/settings/profile.svg' },
] as const;

function GeneralTab({ profile, onClose }: TabContentProps) {
  const [username, setUsername] = useState(profile.name);
  const { modifyProfile, loading } = useProfiles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await modifyProfile({
      userId: profile.userId,
      profileId: profile.profileId,
      name: username,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-medium">一般設定</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">ユーザー名</label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? '保存中...' : '保存'}
        </Button>
      </form>
    </div>
  );
}

function ProfileTab({ profile, onClose }: TabContentProps) {
  const [themeColor, setThemeColor] = useState(() => {
    try {
      const customData = JSON.parse(profile.customData || '{}');
      return customData.themeColor || '1D282E';
    } catch {
      return '1D282E';
    }
  });

  const { modifyProfile, loading } = useProfiles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const customData = JSON.stringify({ themeColor });
    await modifyProfile({
      userId: profile.userId,
      profileId: profile.profileId,
      customData,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-medium">プロファイル設定</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <ThemeColorPicker
          selectedColor={themeColor}
          onColorSelect={setThemeColor}
        />
        <Button type="submit" disabled={loading}>
          {loading ? '保存中...' : '保存'}
        </Button>
      </form>
    </div>
  );
}

export function SettingsModal({ isOpen, onClose, profile }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('general');

  const renderTabContent = () => {
    const props = { profile, onClose };
    switch (activeTab) {
      case 'general':
        return <GeneralTab {...props} />;
      case 'profile':
        return <ProfileTab {...props} />;
      default:
        return (
          <div className="p-6">
            <p className="text-gray-500">準備中...</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 gap-0">
        <DialogTitle className="sr-only">設定</DialogTitle>
        <DialogDescription className="sr-only">
          プロフィールの設定を管理します
        </DialogDescription>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4 space-y-6">
            <div className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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
          <div className="flex-1 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}