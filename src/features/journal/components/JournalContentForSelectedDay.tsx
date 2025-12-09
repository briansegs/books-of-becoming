import { Separator } from '@/features/shared/components/ui/separator'
import { JournalContentForSelectedDayProps } from '../types'
import { JournalDailyEntry } from './JournalDailyEntry'
import { JournalStartNewEntryButton } from './JournalStartNewEntryButton'

export function JournalContentForSelectedDay({
  currentEntry,
  setOpenDeleteDialog,
  setSelectedEntry,
  setCurrentIndex,
  todaysIndex,
}: JournalContentForSelectedDayProps) {
  return (
    <div>
      {currentEntry?.entries.map((entry, index) => {
        return (
          <JournalDailyEntry
            key={entry._creationTime}
            entry={entry}
            index={index}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setSelectedEntry={setSelectedEntry}
            currentEntry={currentEntry}
          />
        )
      })}

      <div className="flex flex-col items-center gap-6 px-8">
        <Separator />

        <JournalStartNewEntryButton setCurrentIndex={setCurrentIndex} todaysIndex={todaysIndex} />
      </div>
    </div>
  )
}
