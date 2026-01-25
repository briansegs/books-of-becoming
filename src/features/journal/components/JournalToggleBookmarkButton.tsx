'use client'

import { ToggleBookmarkButtonProps } from '../types'
import { Bookmark } from 'lucide-react'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { Button } from '@/features/shared/components/ui/button'

export function JournalToggleBookmarkButton({ entry }: ToggleBookmarkButtonProps) {
  const { isAuthenticated } = useConvexAuth()

  const toggleBookmark = useMutation(api.entry.toggleBookmark)
  const bookmarkedEntry = useQuery(
    api.entry.getEntryById,
    isAuthenticated ? { entryId: entry._id } : 'skip',
  )

  if (!bookmarkedEntry) {
    return null
  }

  async function handleToggleBookmark() {
    if (bookmarkedEntry)
      try {
        await toggleBookmark({ entryId: entry._id })
        toast.success(!bookmarkedEntry.bookmarked ? 'Added bookmark' : 'Removed bookmark')
      } catch (error) {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
      }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          className="size-12 rounded-full"
          aria-label={bookmarkedEntry.bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          aria-pressed={bookmarkedEntry.bookmarked}
          onClick={handleToggleBookmark}
        >
          <Bookmark
            className={cn('size-5', bookmarkedEntry.bookmarked && 'fill-accent-foreground')}
          />
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        {bookmarkedEntry.bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      </TooltipContent>
    </Tooltip>
  )
}
