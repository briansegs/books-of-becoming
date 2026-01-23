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
import { useMutation, useQuery } from 'convex/react'
import { Bookmark, BookMarked } from 'lucide-react'
import { JournalBookmarksListProps } from '../types'

// Todo: Add toast on remove bookmark
export function JournalBookmarksList({ journal }: JournalBookmarksListProps) {
  const toggleBookmark = useMutation(api.entry.toggleBookmark)
  const bookmarks = useQuery(api.entry.getBookmarkedByJournal, { journalId: journal._id })

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
          {bookmarks?.length === 0 && (
            <div className="ml-4 text-sm text-muted-foreground">No bookmarks yet...</div>
          )}

          {bookmarks?.map((bookmark) => {
            return (
              <div
                key={bookmark._id}
                className="flex items-center justify-between py-2 pr-4 pl-0 hover:bg-accent"
              >
                {/* Todo: Go to entry on click */}
                <Button variant="link" className="max-w-[250px] justify-start sm:max-w-[350px]">
                  <span className="block truncate">{bookmark.title}</span>
                </Button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* Todo: Remove Bookmark */}
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => toggleBookmark({ entryId: bookmark._id })}
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
