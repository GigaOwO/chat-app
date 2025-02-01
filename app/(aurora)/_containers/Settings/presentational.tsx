import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/_components/ui/dialog';
import { cn } from '@/_lib/utils';
import { Button } from '@/_components/ui/button';
import { LogoutButton } from '@/_components/LogoutButton';
import { Input } from '@/_components/ui/input';
import { ThemeColorPicker } from '../ThemeColors/picker';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import type { Profiles } from '@/_lib/graphql/API';
import { useState } from 'react';
import { TABS } from './constants';
import type { TabId } from './types';

interface SettingsModalPresentationProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profiles;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  loading: boolean;
  onGeneralSubmit: (username: string) => Promise<void>;
  onProfileSubmit: (themeColor: string) => Promise<void>;
  onProfileDelete: () => Promise<void>;
}

export function SettingsModalPresentation({
  isOpen,
  onClose,
  profile,
  activeTab,
  onTabChange,
  loading,
  onGeneralSubmit,
  onProfileSubmit,
  onProfileDelete
}: SettingsModalPresentationProps) {
  const [formState, setFormState] = useState({
    username: profile.name,
    themeColor: (() => {
      try {
        const customData = JSON.parse(profile.customData || '{}');
        return customData.themeColor || '1D282E';
      } catch {
        return '1D282E';
      }
    })(),
    deleteConfirmation: ''
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onGeneralSubmit(formState.username);
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                ユーザー名
              </label>
              <Input
                id="username"
                value={formState.username}
                onChange={(e) => setFormState(prev => ({ ...prev, username: e.target.value }))}
                className="w-full"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? '保存中...' : '保存'}
            </Button>
          </form>
        );

      case 'profile':
        return (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onProfileSubmit(formState.themeColor);
            }}
            className="space-y-6"
          >
            <ThemeColorPicker
              selectedColor={formState.themeColor}
              onColorSelect={(color) => setFormState(prev => ({ ...prev, themeColor: color }))}
            />
            <Button type="submit" disabled={loading}>
              {loading ? '保存中...' : '保存'}
            </Button>
          </form>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <div className="border-t pt-6">
              <LogoutButton />
            </div>
          </div>
        );

      case 'danger':
        return (
          <div className="space-y-6">
            <Alert variant="destructive">
              <AlertDescription>
                プロフィールを削除すると、このプロフィールに関連するすべてのデータが完全に削除されます。
                この操作は取り消すことができません。
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="deleteConfirmation" className="text-sm font-medium">
                  削除を確認するには「delete」と入力してください
                </label>
                <Input
                  id="deleteConfirmation"
                  value={formState.deleteConfirmation}
                  onChange={(e) => setFormState(prev => ({ ...prev, deleteConfirmation: e.target.value }))}
                  className="w-full"
                />
              </div>

              <Button
                type="button"
                variant="destructive"
                disabled={formState.deleteConfirmation !== 'delete' || loading}
                onClick={onProfileDelete}
                className="w-full"
              >
                {loading ? '削除中...' : 'プロフィールを削除'}
              </Button>
            </div>
          </div>
        );

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
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                    activeTab === tab.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50",
                    tab.id === 'danger' && "text-red-600 hover:bg-red-50"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-lg font-medium mb-6">
              {TABS.find(tab => tab.id === activeTab)?.label}設定
            </h3>
            {renderTabContent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}