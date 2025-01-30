import { CurrentProfile } from "./_components/CurrentProfile"
import { ProfileProvider } from "./_components/ProfileContext"
import { ProfileSwitcher } from "./_components/ProfileSwitcher"

export default function DMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProfileProvider>
      <div className="flex h-screen">
        <div className="flex flex-col bg-[#202020] p-3 w-60">
          <div className="mt-auto space-y-2">
            <ProfileSwitcher />
            <CurrentProfile />
          </div>
        </div>
        <main className="">
          {children}
        </main>
      </div>
    </ProfileProvider>
  )
}