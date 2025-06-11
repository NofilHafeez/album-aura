'use client'

import { usePathname } from 'next/navigation'
import Navbar from './maincomponents/Navbar'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavbar = ['/login', '/sign-in'].includes(pathname)

  return (
    <div className="max-w-[1440px] m-auto min-h-screen">
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  )
}
