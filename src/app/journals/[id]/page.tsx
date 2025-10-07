import { JournalsContent } from '@/features/journal/components/JournalsContent'
import { JournalsHeader } from '@/features/journal/components/JournalsHeader'
import type { Journal } from '@/features/journal/types'

import { auth } from '@clerk/nextjs/server'
import { api } from 'convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { redirect } from 'next/navigation'

type Args = {
  params: Promise<{
    id: string
  }>
}

export default async function Journals({ params }: Args) {
  const { id: userIdFromPath } = await params
  const { userId, getToken } = await auth()

  let journals: Journal[] | null = null
  let fetchError = false

  if (!userId) {
    console.error('Failed to fetch Clerk user')
    fetchError = true
  }

  if (userId !== userIdFromPath) {
    redirect(`/journals/${userId}`)
  }

  try {
    const token = (await getToken({ template: 'convex' })) || ''
    journals = await fetchQuery(api.journals.get, {}, { token })
  } catch (error) {
    console.error('Failed to fetch journals:', error)
    fetchError = true
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 p-12">
      <JournalsHeader />

      <JournalsContent journals={journals || []} fetchError={fetchError} />
    </div>
  )
}
