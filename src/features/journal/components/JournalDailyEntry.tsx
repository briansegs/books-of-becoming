import { Button } from '@/features/shared/components/ui/button'
import { Separator } from '@/features/shared/components/ui/separator'
import { SafeHtml } from '@/utilities/SafeHtml'
import { JournalDailyEntryProps } from '../types'

export function JournalDailyEntry({
  entry,
  index,
  setOpenDeleteDialog,
  setSelectedEntry,
  currentEntry,
}: JournalDailyEntryProps) {
  if (!entry) {
    return null
  }

  return (
    <div key={entry._creationTime} className="px-8">
      <h2 className="mb-4 text-2xl">{entry.title}</h2>
      <SafeHtml html={entry.content} className="prose prose-sm max-w-none dark:prose-invert" />

      <div className="flex gap-4 py-4">
        <Button>Edit</Button>

        <Button
          variant="destructive"
          onClick={() => {
            setOpenDeleteDialog(true)
            setSelectedEntry(entry)
          }}
        >
          Delete
        </Button>
      </div>

      {currentEntry && index !== currentEntry.entries.length - 1 && <Separator />}
    </div>
  )
}
