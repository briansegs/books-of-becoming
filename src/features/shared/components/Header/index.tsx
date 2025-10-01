import Logo from '@/features/shared/components/navbar-components/logo'

import { ThemeToggle } from './ThemeToggle'
import { HeaderUserItems } from './HeaderUserItems'

import Link from 'next/link'
import { NavMenu } from './NavMenu'
import { MobileNavMenu } from './MobileNavMenu'

// Navigation links array to be used in both desktop and mobile menus
const navLinks = [
  { href: '/', label: 'Home', key: 1 },
  { href: '#', label: 'Features', key: 2 },
  { href: '#', label: 'Pricing', key: 3 },
  { href: '#', label: 'About', key: 4 },
]

export type NavLinks = {
  href: string
  label: string
  key: number
}[]

export function Header() {
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 justify-between gap-4">
        {/* Left side */}
        <div className="flex gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>

            <NavMenu navLinks={navLinks} />
          </div>

          <MobileNavMenu navLinks={navLinks} />
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <HeaderUserItems />

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
