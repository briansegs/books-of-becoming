import { Button } from '@/features/shared/components/ui/button'
import { Separator } from '@/features/shared/components/ui/separator'
import { SafeHtml } from '@/utilities/SafeHtml'
import { JournalDailyEntryProps } from '../types'
import { format } from 'date-fns'
import { Bookmark } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from 'convex/_generated/api'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'

export function JournalDailyEntry({
  entry,
  index,
  setOpenDeleteDialog,
  currentEntryGroup,
  setEditMode,
}: JournalDailyEntryProps) {
  const toggleBookmark = useMutation(api.entry.toggleBookmark)
  const [isBookmarked, setIsBookmarked] = useState(entry?.bookmarked)

  if (!entry) {
    return null
  }

  async function handleToggleBookmark() {
    const next = !isBookmarked
    setIsBookmarked(next)

    if (entry) {
      try {
        await toggleBookmark({ entryId: entry._id })
        toast.success(next ? 'Added bookmark' : 'Removed bookmark')
      } catch (error) {
        setIsBookmarked(!next)
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      }
    }
  }

  const createdTime = format(new Date(entry._creationTime), 'h:mm aaaa')

  return (
    <div key={entry._creationTime} id={entry._id} className="px-8">
      <div className="space-y-6 pt-6 pb-8">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-2xl">{entry.title}</h2>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="size-12 rounded-full"
                aria-label="Toggle bookmark"
                onClick={handleToggleBookmark}
              >
                <Bookmark className={cn('size-5', isBookmarked && 'fill-accent-foreground')} />
              </Button>
            </TooltipTrigger>

            <TooltipContent>{isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}</TooltipContent>
          </Tooltip>
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
