'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/features/shared/components/ui/navigation-menu'
import { usePathname } from 'next/navigation'
import { NavLinks } from '.'
import Link from 'next/link'

type NavMenuProps = {
  navLinks: NavLinks
}

export function NavMenu({ navLinks }: NavMenuProps) {
  const pathname = usePathname()

  return (
    <NavigationMenu className="h-full *:h-full max-md:hidden">
      <NavigationMenuList className="h-full gap-2">
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.key} className="h-full">
            <NavigationMenuLink
              asChild
              active={pathname === link.href}
              className="h-full justify-center rounded-none border-y-2 border-transparent py-1.5 text-lg font-medium text-muted-foreground hover:border-b-primary hover:bg-transparent hover:text-primary data-[active]:border-b-primary"
            >
              <Link href={link.href}>{link.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
