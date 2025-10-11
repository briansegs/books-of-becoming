import { JournalHeader } from '@/features/journal/components/JournalHeader'

import { Journal } from '@/features/journals/types'
import { auth } from '@clerk/nextjs/server'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { redirect } from 'next/navigation'

type Args = {
  params: Promise<{
    id: string
  }>
}

export default async function JournalPage({ params }: Args) {
  const { id: journalId } = await params
  const { userId, getToken } = await auth()

  if (!userId) {
    redirect('/')
  }

  let journal: Journal | null = null

  try {
    const token = (await getToken({ template: 'convex' })) || ''
    journal = await fetchQuery(api.journal.get, { id: journalId as Id<'journals'> }, { token })
  } catch (error) {
    console.error('Failed to fetch journal:', error)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Failed to fetch journal. Please try again later.</p>
      </div>
    )
  }

  if (!journal) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Missing journal. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full px-12 py-6">
      <JournalHeader journal={journal} />
    </div>
  )
}
