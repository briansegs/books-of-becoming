'use client'

import { Button } from '@/features/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/features/shared/components/ui/dialog'
import { Separator } from '@/features/shared/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { api } from 'convex/_generated/api'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { Bookmark, BookMarked } from 'lucide-react'
import { JournalBookmarksListProps } from '../types'
import { Id } from 'convex/_generated/dataModel'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'

// Todo: Go to entry on click

// This list only contains bookmarked entries,
// so toggleBookmark acts as a remove here
export function JournalBookmarksList({ journal }: JournalBookmarksListProps) {
  const { isAuthenticated } = useConvexAuth()

  const removeBookmark = useMutation(api.entry.toggleBookmark)
  const bookmarkedEntries = useQuery(
    api.entry.getBookmarkedByJournal,
    isAuthenticated ? { journalId: journal._id } : 'skip',
  )

  async function handleRemoveBookmark(entryId: Id<'entries'>) {
    try {
      await removeBookmark({ entryId })
      toast.success('Removed bookmark')
    } catch (error) {
      toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred')
    }
  }

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" aria-label="Open Bookmarks">
              <BookMarked />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent>
          <p>View Journal Bookmarks</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Bookmarks</DialogTitle>
          <DialogDescription>List of all bookmarked journal entries</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="h-96 overflow-y-auto pl-3 [scrollbar-gutter:stable]">
          {bookmarkedEntries?.length === 0 && (
            <div className="ml-4 text-sm text-muted-foreground">No bookmarks yet...</div>
          )}

          {bookmarkedEntries?.map((entry) => {
            return (
              <div
                key={entry._id}
                className="flex items-center justify-between py-2 pr-4 pl-0 hover:bg-accent"
              >
                {/* Todo: Go to entry on click */}
                <Button variant="link" className="max-w-[250px] justify-start sm:max-w-[350px]">
                  <span className="block truncate">{entry.title}</span>
                </Button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="destructive"
                      aria-label="Remove bookmark"
                      onClick={() => handleRemoveBookmark(entry._id)}
                    >
                      <Bookmark />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Remove Bookmark</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
