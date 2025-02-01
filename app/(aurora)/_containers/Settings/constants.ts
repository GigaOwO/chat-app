import type { Tab } from './types';

export const TABS: Tab[] = [
  { id: 'general', label: '一般', icon: '/settings/general.svg' },
  { id: 'profile', label: 'プロフィール', icon: '/settings/profile.svg' },
  { id: 'account', label: 'アカウント', icon: '/settings/account.svg' },
  { id: 'danger', label: '危険な操作', icon: '/settings/danger.svg' },
] as const;