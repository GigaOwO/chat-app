import { ProfileProvider } from '../_containers/Profile/context';
import { UserProvider } from '../_containers/User/context';
import { ProfileSwitcherContainer } from '../_containers/ProfileSwitcher/container';
import { CurrentProfileContainer } from '../_containers/CurrentProfile/container';
import { ChatListContainer } from './_containers/ChatList/container';

export default function DMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <ProfileProvider>
        <div className="flex h-screen">
          <div className="flex flex-col bg-gray4 p-3 w-60">
            <div className="flex-1 overflow-y-auto">
              <ChatListContainer />
            </div>
            <div className="mt-auto space-y-2">
              <ProfileSwitcherContainer />
              <CurrentProfileContainer />
            </div>
          </div>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </div>
      </ProfileProvider>
    </UserProvider>
  );
}