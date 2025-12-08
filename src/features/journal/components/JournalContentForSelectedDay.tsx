import { JournalContentForSelectedDayProps } from '../types'
import { JournalDailyEntry } from './JournalDailyEntry'

export function JournalContentForSelectedDay({
  currentEntry,
  setOpenDeleteDialog,
  setSelectedEntry,
}: JournalContentForSelectedDayProps) {
  return (
    <div className="space-y-4">
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
    </div>
  )
}
