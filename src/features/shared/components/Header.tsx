import Logo from '@/features/shared/components/navbar-components/logo'
import { Button } from '@/features/shared/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/features/shared/components/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/features/shared/components/ui/popover'
import { ThemeToggle } from './ThemeToggle'
import { HeaderUserItems } from './HeaderUserItems'

import Link from 'next/link'
import { NavMenu } from './NavMenu'

// Navigation links array to be used in both desktop and mobile menus
const navLinks = [
  { href: '/', label: 'Home', key: 1 },
  { href: '#', label: 'Features', key: 2 },
  { href: '#', label: 'Pricing', key: 3 },
  { href: '#', label: 'About', key: 4 },
]

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

          <MobileMenu />
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

function MobileMenu() {
  return (
    <div className="flex items-center md:hidden">
      {/* Mobile menu trigger */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Toggle navigation menu"
            className="group size-8"
            variant="ghost"
            size="icon"
          >
            <svg
              className="pointer-events-none"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L20 12"
                className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
              />
              <path
                d="M4 12H20"
                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
              />
              <path
                d="M4 12H20"
                className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
              />
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-36 p-1 md:hidden">
          <NavigationMenu className="max-w-none *:w-full">
            <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.key} className="w-full">
                  <NavigationMenuLink href={link.href} className="py-1.5">
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </PopoverContent>
      </Popover>
    </div>
  )
}
