'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/features/shared/components/ui/navigation-menu'
import { usePathname } from 'next/navigation'

type NavMenuProps = {
  navLinks: {
    href: string
    label: string
  }[]
}

export function NavMenu({ navLinks }: NavMenuProps) {
  const pathname = usePathname()

  return (
    <NavigationMenu className="h-full *:h-full max-md:hidden">
      <NavigationMenuList className="h-full gap-2">
        {navLinks?.map((link, index) => (
          <NavigationMenuItem key={index} className="h-full">
            <NavigationMenuLink
              active={pathname === link.href}
              href={link.href}
              className="h-full justify-center rounded-none border-y-2 border-transparent py-1.5 text-lg font-medium text-muted-foreground hover:border-b-primary hover:bg-transparent hover:text-primary data-[active]:border-b-primary data-[active]:bg-transparent!"
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
