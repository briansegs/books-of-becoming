'use client'

import { Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/features/shared/components/ui/button'

export function HeaderUserItems() {
  return (
    <>
      <Unauthenticated>
        <SignInButton mode="modal">
          <Button size="lg" className="text-base">
            Sign In
          </Button>
        </SignInButton>
      </Unauthenticated>

      <Authenticated>
        <UserButton />
      </Authenticated>
    </>
  )
}
