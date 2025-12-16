import { Journal } from '@/features/journals/types'
import { auth } from '@clerk/nextjs/server'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { DailyEntryGroup } from '@/features/journal/types'
import { JournalPageWrapper } from '@/features/journal/components/JournalPageWrapper'

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

  const token = (await getToken({ template: 'convex' })) || ''

  try {
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
  let entriesCount: number = 0

  try {
    const ungroupedEntries = await fetchQuery(
      api.entries.get,
      { id: journalId as Id<'journals'> },
      { token },
    )

    entriesCount = ungroupedEntries.length

    const todayKey = format(new Date(), 'yyyy-MM-dd')
    const dailyEntryGroups: DailyEntryGroup[] = []

    ungroupedEntries.forEach((entry) => {
      const dateKey = format(new Date(entry._creationTime), 'yyyy-MM-dd')

      let entryGroup = dailyEntryGroups.find((group) => group.date === dateKey)

      if (!entryGroup) {
        entryGroup = { date: dateKey, entries: [] } as DailyEntryGroup
        dailyEntryGroups.push(entryGroup)
      }

      entryGroup.entries.push(entry)
    })

    if (!dailyEntryGroups.find((group) => group.date === todayKey)) {
      dailyEntryGroups.push({ date: todayKey, entries: [] })
    }

    dailyEntries = dailyEntryGroups.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
  } catch (error) {
    console.error('Failed to fetch journal entries:', error)

    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Missing journal entries. Please try again later.</p>
      </div>
    )
  }

  return (
    <JournalPageWrapper journal={journal} dailyEntries={dailyEntries} entriesCount={entriesCount} />
  )
}
