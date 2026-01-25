import { Dispatch, SetStateAction, useMemo } from 'react'
import { Doc } from 'convex/_generated/dataModel'
import { DailyEntryGroup } from '@/features/journal/types'

export function useGoToJournalEntry(
  dailyEntries: DailyEntryGroup[],
  setCurrentIndex: Dispatch<SetStateAction<number>>,
) {
  const entryDateToIndex = useMemo(() => {
    const map = new Map<string, number>()
    dailyEntries.forEach((g, i) => map.set(g.date, i))
    return map
  }, [dailyEntries])

  const allEntries = useMemo(
    () =>
      dailyEntries.flatMap((group) =>
        group.entries.map((entry) => ({
          ...entry,
          date: group.date,
        })),
      ),
    [dailyEntries],
  )

  function goToEntry(entry: Doc<'entries'>) {
    const matched = allEntries.find((e) => e._id === entry._id)
    const index = matched ? entryDateToIndex.get(matched.date) : undefined

    if (index !== undefined) {
      setCurrentIndex(index)
    }

    requestAnimationFrame(() => {
      document.getElementById(entry._id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  return { goToEntry }
}
