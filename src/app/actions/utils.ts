import { auth } from '@clerk/nextjs/server'

export async function getUserToken() {
  const { userId, getToken } = await auth()
  if (!userId) throw new Error('No userId found')

  const token = await getToken({ template: 'convex' })

  if (!token) throw new Error('No user token found')

  return token
}
