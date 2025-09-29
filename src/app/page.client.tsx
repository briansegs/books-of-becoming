'use client'

import { useUser } from '@clerk/nextjs'
import { api } from 'convex/_generated/api'
import { Authenticated, Unauthenticated, useConvexAuth, useQuery } from 'convex/react'
import { LoaderCircle } from 'lucide-react'

import type { Doc } from 'convex/_generated/dataModel'

type UserType = Doc<'users'> | null

export function HomeClient({ initialUser }: { initialUser: UserType }) {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const { user: clerkUser } = useUser()

  const liveUser = useQuery(api.user.get, clerkUser ? { clerkId: clerkUser.id } : 'skip')

  const effectiveUser: UserType = liveUser ?? initialUser

  const { clerkId, email, imageUrl, username, _id, _creationTime } = effectiveUser || {}

  if (isLoading || (isAuthenticated && liveUser === undefined)) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-16 p-8 pb-20">
        <div className="flex items-center gap-4 text-3xl text-muted-foreground">
          <LoaderCircle className="animate-spin" /> Loading…
        </div>
      </div>
    )
  }

  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center gap-16 p-8 pb-20">
          <article className="prose dark:prose-invert">
            <h1>Hello</h1>
            <p>This is the landing page.</p>
            <ul>
              <li>We know it works</li>
              <li>A great place to start</li>
              <li>Auth next</li>
              <li>Then the database</li>
              <li>Pages after that</li>
            </ul>
            <blockquote>From here --- We only go up from here!</blockquote>
          </article>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="flex min-h-screen items-center justify-center gap-16 p-8 pb-20">
          <article className="prose dark:prose-invert">
            <h1>Hello {effectiveUser?.username}</h1>
            <p>
              This is the landing page and you are logged in. Here are some things about you we know
              because you are authenticated.
            </p>
            <ul>
              <li>{`clerkId: ${clerkId}`}</li>
              <li>{`email: ${email}`}</li>

              <li className="flex items-center gap-2">
                {`image: `}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="user image" className="h-12 w-12 rounded-full" />
              </li>
              <li>{`username: ${username}`}</li>
              <li>{`created: ${_creationTime?.toLocaleString()}`}</li>
              <li>{`id: ${_id}`}</li>
            </ul>
            <blockquote>We hav taken one step is a longer journey.</blockquote>
          </article>
        </div>
      </Authenticated>
    </>
  )
}
