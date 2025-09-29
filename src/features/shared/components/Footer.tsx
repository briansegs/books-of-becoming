import Logo from '@/features/shared/components/navbar-components/logo'
import { Button } from '@/features/shared/components/ui/button'
import { Separator } from '@/features/shared/components/ui/separator'
import { Facebook, Github, Twitter } from 'lucide-react'
import Link from 'next/link'

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="#"
      className="cursor-pointer text-lg text-muted-foreground underline underline-offset-3 hover:text-muted-foreground/90"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="w-full border-t px-12 py-6">
      <div className="flex flex-col gap-6">
        <a href="#" className="text-primary hover:text-primary/90">
          <Logo />
        </a>

        <p className="text-lg">
          Books of Becoming gives you a set of tools to awaken yourself, snap out of auto pilot, and
          live through your authentic self.
        </p>

        <div className="flex gap-2">
          <FooterLink>Privacy Policy</FooterLink>
          <FooterLink>Terms of Service</FooterLink>
          <FooterLink>Cookie Policy</FooterLink>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Button variant="outline" size="icon">
              <Facebook className="h-8 w-8" />
            </Button>
            <Button variant="outline" size="icon">
              <Github className="h-8 w-8" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-8 w-8" />
            </Button>
          </div>

          <p className="text-muted-foreground">
            © Book of Becoming. All rights reserved. 2025-present.
          </p>
        </div>
      </div>
    </footer>
  )
}
