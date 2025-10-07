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

  if (!userId) {
    redirect('/')
  }

  if (userId !== userIdFromPath) {
    redirect(`/journals/${userId}`)
  }

  let journals: Journal[] | null = null

  try {
    const token = (await getToken({ template: 'convex' })) || ''
    journals = await fetchQuery(api.journals.get, {}, { token })
  } catch (error) {
    console.error('Failed to fetch journals:', error)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Failed to fetch journals. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 p-12">
      <JournalsHeader />

      <JournalsContent journals={journals || []} />
    </div>
  )
}
