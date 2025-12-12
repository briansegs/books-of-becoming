import { Separator } from '@/features/shared/components/ui/separator'
import { JournalContentForSelectedDayProps } from '../types'
import { JournalStartNewEntryButton } from './JournalStartNewEntryButton'
import { JournalDailyEntryItem } from './JournalDailyEntryItem'

export function JournalContentForSelectedDay({
  currentEntryGroup,
  setOpenDeleteDialog,
  setCurrentIndex,
  todaysIndex,
}: JournalContentForSelectedDayProps) {
  return (
    <div>
      <Separator />

      {currentEntryGroup?.entries.map((entry, index) => {
        return (
          <JournalDailyEntryItem
            key={entry._creationTime}
            entry={entry}
            index={index}
            setOpenDeleteDialog={setOpenDeleteDialog}
            currentEntryGroup={currentEntryGroup}
            editorLabel="Editing Entry:"
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
