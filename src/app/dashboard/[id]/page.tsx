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

  if (!userId) {
    redirect('/')
  }

  if (userId !== userIdFromPath) {
    redirect(`/dashboard/${userId}`)
  }

  let convexUser: UserType = null

  try {
    convexUser = await fetchQuery(api.user.getUser, { clerkId: userId })
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Failed to load user data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <p>Dashboard for {convexUser.username}</p>
    </div>
  )
}
