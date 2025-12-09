import { Separator } from '@/features/shared/components/ui/separator'
import { format } from 'date-fns'
import { JournalContentForTodayProps } from '../types'
import { JournalDailyEntry } from './JournalDailyEntry'

export function JournalContentForToday({
  dailyEntries,
  todaysDate,
  setOpenDeleteDialog,
  setSelectedEntry,
}: JournalContentForTodayProps) {
  const todaysEntries = dailyEntries.find((g) => {
    const groupDate = g.date
    const today = format(new Date(todaysDate), 'yyyy-MM-dd')
    return groupDate === today
  })

  return (
    <div>
      <Separator />

      {todaysEntries?.entries.map((entry, index) => {
        return (
          <JournalDailyEntry
            key={entry._creationTime}
            entry={entry}
            index={index}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setSelectedEntry={setSelectedEntry}
            currentEntry={todaysEntries}
          />
        )
      })}
    </div>
  )
}
