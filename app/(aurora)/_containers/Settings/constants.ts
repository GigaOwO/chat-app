import type { Tab } from './types';

export const TABS: Tab[] = [
  { id: 'account', label: 'アカウント', icon: '/settings/account.svg' },
  { id: 'profile', label: 'プロフィール', icon: '/settings/profile.svg' },
] as const;