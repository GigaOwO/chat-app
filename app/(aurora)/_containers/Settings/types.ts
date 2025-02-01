export type TabId = 'general' | 'profile' | 'danger' | 'account';

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
}