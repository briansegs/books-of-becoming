import { SafeHtml } from '@/utilities/SafeHtml'
import { JournalContentForSelectedDayProps } from '../types'
import { Button } from '@/features/shared/components/ui/button'
import { Separator } from '@/features/shared/components/ui/separator'

export function JournalContentForSelectedDay({
  currentEntry,
  setOpenDeleteDialog,
  setSelectedEntry,
}: JournalContentForSelectedDayProps) {
  return (
    <div className="space-y-4">
      {currentEntry?.entries.map((entry, index) => {
        return (
          <div key={entry._creationTime}>
            <h2 className="text-2xl">{entry.title}</h2>
            <SafeHtml
              html={entry.content}
              className="prose prose-sm max-w-none dark:prose-invert"
            />

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

            {index !== currentEntry.entries.length - 1 && <Separator />}
          </div>
        )
      })}
    </div>
  )
}
