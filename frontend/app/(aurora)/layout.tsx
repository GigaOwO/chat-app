export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="min-h-screen py-8">{children}</main>
}