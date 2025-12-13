import { Separator } from '@/features/shared/components/ui/separator'
import { format } from 'date-fns'
import { JournalContentForTodayProps } from '../types'
import { JournalDailyEntryItem } from './JournalDailyEntryItem'

export function JournalContentForToday({
  dailyEntries,
  todaysDate,
  setOpenDeleteDialog,
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
          <JournalDailyEntryItem
            key={entry._creationTime}
            entry={entry}
            index={index}
            setOpenDeleteDialog={setOpenDeleteDialog}
            currentEntryGroup={todaysEntries}
            editorLabel="Editing Entry:"
          />
        )
      })}
    </div>
  )
}
