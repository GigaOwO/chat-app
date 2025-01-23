export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="min-h-screen w-screen bg-gray-800 text-white">{children}</main>
}