import { auth } from '@clerk/nextjs/server'
import { api } from 'convex/_generated/api'

import type { Doc } from 'convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'

type UserType = Doc<'users'> | null

export default async function Dashboard() {
  const { userId: clerkId } = await auth()

  let convexUser: UserType = null

  if (clerkId) {
    convexUser = await fetchQuery(api.user.get, { clerkId: clerkId })
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      Dashboard for {convexUser?.username}
    </div>
  )
}
