import { Button } from '@/features/shared/components/ui/button'
import { Separator } from '@/features/shared/components/ui/separator'
import { SafeHtml } from '@/utilities/SafeHtml'
import { JournalDailyEntryProps } from '../types'
import { format } from 'date-fns'
import { Bookmark } from 'lucide-react'

export function JournalDailyEntry({
  entry,
  index,
  setOpenDeleteDialog,
  currentEntryGroup,
  setEditMode,
}: JournalDailyEntryProps) {
  if (!entry) {
    return null
  }

  const createdTime = format(new Date(entry._creationTime), 'h:mm aaaa')

  return (
    <div key={entry._creationTime} id={entry._id} className="px-8">
      <div className="space-y-6 pt-6 pb-8">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-2xl">{entry.title}</h2>

          {/* Todo: Connect bookmark actions to button */}
          <Button variant="outline" className="size-12 rounded-full" aria-label="Toggle bookmark">
            <Bookmark className="size-5" />
          </Button>
        </div>

        <SafeHtml html={entry.content} className="prose prose-sm max-w-none dark:prose-invert" />

        <p className="text-sm text-muted-foreground">{createdTime}</p>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setEditMode(true)
            }}
          >
            Edit
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              setOpenDeleteDialog(true)
            }}
          >
            Delete
          </Button>

          {entry.updatedAt && (
            <p className="text-sm text-muted-foreground">
              <span className="font-bold">Updated: </span>
              {format(new Date(entry.updatedAt), 'M/d/yyyy @ h:mm a')}
            </p>
          )}
        </div>
      </div>

      {currentEntryGroup && index !== currentEntryGroup.entries.length - 1 && <Separator />}
    </div>
  )
}
