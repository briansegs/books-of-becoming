import { Button } from '@/features/shared/components/ui/button'
import { Separator } from '@/features/shared/components/ui/separator'
import { SafeHtml } from '@/utilities/SafeHtml'
import { JournalDailyEntryProps } from '../types'
import { format } from 'date-fns'

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

  const createdTime = format(new Date(entry._creationTime), 'h:mm aaaa')

  return (
    <div key={entry._creationTime} className="px-8">
      <div className="space-y-6 pt-6 pb-8">
        <h2 className="text-2xl">{entry.title}</h2>

        <SafeHtml html={entry.content} className="prose prose-sm max-w-none dark:prose-invert" />

        <p className="text-sm text-muted-foreground">{createdTime}</p>

        <div className="flex gap-4">
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
      </div>

      {currentEntry && index !== currentEntry.entries.length - 1 && <Separator />}
    </div>
  )
}
