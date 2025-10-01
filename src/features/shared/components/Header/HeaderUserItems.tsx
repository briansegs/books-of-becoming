'use client'

import { Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/features/shared/components/ui/button'
import { HomeIcon } from 'lucide-react'
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

      <Authenticated>
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost">
              <HomeIcon /> <span className="hidden sm:block">Dashboard</span>
            </Button>
          </Link>

          <UserButton />
        </div>
      </Authenticated>
    </>
  )
}
