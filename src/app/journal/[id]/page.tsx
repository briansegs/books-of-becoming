import { JournalContent } from '@/features/journal/components/ journalContent'
import { JournalHeader } from '@/features/journal/components/JournalHeader'

import { Journal } from '@/features/journals/types'
import { Separator } from '@/features/shared/components/ui/separator'
import { auth } from '@clerk/nextjs/server'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { DailyEntryGroup } from '@/features/journal/types'

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

  let dailyEntries: DailyEntryGroup[] = []

  try {
    const token = (await getToken({ template: 'convex' })) || ''
    const ungroupedEntries = await fetchQuery(
      api.entries.get,
      { id: journalId as Id<'journals'> },
      { token },
    )

    const initialGroup = { date: format(new Date(), 'yyyy-MM-dd'), entries: [] } as DailyEntryGroup

    const dailyEntryGroups: DailyEntryGroup[] = [initialGroup]

    ungroupedEntries.forEach((entry) => {
      const dateKey = format(new Date(entry._creationTime), 'yyyy-MM-dd')

      let entryGroup = dailyEntryGroups.find((group) => group.date === dateKey)

      if (!entryGroup) {
        entryGroup = { date: dateKey, entries: [] } as DailyEntryGroup
        dailyEntryGroups.push(entryGroup)
      }

      entryGroup.entries.push(entry)
    })

    dailyEntries = dailyEntryGroups.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
  } catch (error) {
    console.error('Failed to fetch journal entries:', error)
  }

  return (
    <div className="min-h-screen w-full space-y-6 px-12 py-6">
      <JournalHeader journal={journal} />

      <Separator />

      <JournalContent dailyEntries={dailyEntries} journal={journal} />
    </div>
  )
}
