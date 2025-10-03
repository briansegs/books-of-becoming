import { auth } from '@clerk/nextjs/server'
import { api } from 'convex/_generated/api'

import type { Doc } from 'convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { redirect } from 'next/navigation'

type UserType = Doc<'users'> | null

type Args = {
  params: Promise<{
    id: string
  }>
}

export default async function Dashboard({ params }: Args) {
  const { id: userIdFromPath } = await params
  const { userId } = await auth()

  if (userId !== userIdFromPath) {
    redirect(`/dashboard/${userId}`)
  }

  let convexUser: UserType = null
  let fetchError = false

  try {
    convexUser = await fetchQuery(api.user.getUser, { clerkId: userId })
  } catch (error) {
    console.error('Failed to fetch user:', error)
    fetchError = true
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {convexUser ? (
        <p>Dashboard for {convexUser.username}</p>
      ) : fetchError ? (
        <p>Failed to load user data. Please try again later.</p>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  )
}
