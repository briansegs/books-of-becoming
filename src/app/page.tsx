import { auth } from '@clerk/nextjs/server'
import { HomeClient } from './page.client'
import { fetchQuery } from 'convex/nextjs'
import { api } from 'convex/_generated/api'
import type { Doc } from 'convex/_generated/dataModel'

type UserType = Doc<'users'> | null

export default async function Home() {
  const { userId } = await auth()

  let convexUser: UserType = null
  if (userId) {
    convexUser = await fetchQuery(api.user.get, { clerkId: userId })
  }

  return <HomeClient initialUser={convexUser} />
}
