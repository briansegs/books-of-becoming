import { JournalContent } from '@/features/journal/components/ journalContent'
import { JournalHeader } from '@/features/journal/components/JournalHeader'

import { Journal } from '@/features/journals/types'
import { Separator } from '@/features/shared/components/ui/separator'
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
    <div className="min-h-screen w-full space-y-6 px-12 py-6">
      <JournalHeader journal={journal} />

      <Separator />

      <JournalContent
        entries={[
          { id: '3', date: '2025-10-03T03:00:00Z', title: 'Looking forward...' },
          { id: '7', date: '2025-10-03T07:00:00Z', title: 'Looking forward...7' },
          { id: '8', date: '2025-10-03T01:00:00Z', title: 'Looking forward...8' },
          { id: '4', date: '2025-10-04T00:00:00Z', title: '' },
          { id: '5', date: '2025-10-05T00:00:00Z', title: 'We were friends' },
          { id: '1', date: '2025-10-01T00:00:00Z', title: 'Im tired' },
          { id: '2', date: '2025-10-02T00:00:00Z', title: '' },
          { id: '6', date: '2025-10-06T00:00:00Z', title: 'Ok ok...' },
          { id: '9', date: '2025-10-13T02:00:00Z', title: 'Ok ok...' },
          { id: '10', date: '2025-10-13T03:00:00Z', title: 'Ok ok...' },
          { id: '11', date: '2025-10-13T01:00:00Z', title: 'Ok ok...' },
        ]}
        type={journal.type}
      />
    </div>
  )
}
