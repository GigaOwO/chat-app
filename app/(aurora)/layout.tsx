import Image from 'next/image'
import Link from 'next/link';

export default function AuroraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigationItems = [
    { href: '/dm', icon: '/sidebar/dm.svg', label: 'DM' },
    { href: '/aurora', icon: '/sidebar/aurora.svg', label: 'Aurora' },
  ];

  return (
    <div className="flex h-screen bg-gray3">
      <div className='flex flex-col gap-3 p-3'>
        {navigationItems.map((item) => (
          <Link href={item.href} key={item.label}>
            <Image src={item.icon} alt={item.label} width={50} height={50} />
          </Link>
        ))}
        <div className="w-[50px] h-[1px] bg-gray1 my-2" />
      </div>


      <main className="">
        {children}
      </main>
    </div>
)}