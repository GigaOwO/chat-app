import { CurrentProfile } from "./_components/CurrentProfile"

export default function DMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col bg-gray2 p-3">
        <CurrentProfile />
      </div>
      <main className="">
        {children}
      </main>
    </div>
  )
}