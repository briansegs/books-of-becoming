'use client'

import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/features/shared/components/ui/button'
import { HomeIcon, User } from 'lucide-react'
import Link from 'next/link'

export function HeaderUserItems() {
  return (
    <>
      <Unauthenticated>
        <SignInButton mode="modal" forceRedirectUrl="/dashboard">
          <Button size="lg" className="text-base">
            Sign In
          </Button>
        </SignInButton>
      </Unauthenticated>

      <AuthLoading>
        <div className="flex items-center gap-2">
          <Button variant="ghost" disabled>
            <HomeIcon /> <span className="hidden sm:block">Dashboard</span>
          </Button>

          <div className="flex h-9 w-9 animate-pulse items-center rounded-full bg-muted">
            <User className="text-muted-foreground/70" />
          </div>
        </div>
      </AuthLoading>

      <Authenticated>
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost">
              <HomeIcon /> <span className="hidden sm:block">Dashboard</span>
            </Button>
          </Link>

          <div className="flex h-9 w-9">
            <UserButton />
          </div>
        </div>
      </Authenticated>
    </>
  )
}
