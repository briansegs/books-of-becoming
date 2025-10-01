import { auth } from '@clerk/nextjs/server'
import { api } from 'convex/_generated/api'

import type { Doc } from 'convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'

type UserType = Doc<'users'> | null

export default async function Dashboard() {
  const { userId } = await auth()

  if (!userId) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Please sign in to view your dashboard.</p>
      </div>
    )
  }

  let convexUser: UserType = null

  try {
    convexUser = await fetchQuery(api.user.get, { clerkId: userId })
  } catch (error) {
    console.log('Failed to fetch user:', error)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {convexUser ? <p> Dashboard for {convexUser?.username}</p> : <p>Loading user data...</p>}
    </div>
  )
}
