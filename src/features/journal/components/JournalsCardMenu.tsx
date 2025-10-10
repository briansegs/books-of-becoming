import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/features/shared/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'
import { cn } from '@/lib/utils'
import { JournalsCardMenuProps } from '../types'

export function JournalsCardMenu({
  buttonColor,
  setJournalId,
  setOpenJournalDeleteDialog,
  setOpenJournalEditDialog,
  journalId,
  setCurrentJournal,
  journal,
}: JournalsCardMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'rounded-full border-none bg-transparent',
            'hover:border-none',
            'shadow-none',
            buttonColor,
          )}
          size="icon"
        >
          <EllipsisVertical className="size-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setCurrentJournal(journal)
              setOpenJournalEditDialog(true)
            }}
          >
            Edit
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Button
            variant="ghost"
            className="w-full text-red-400"
            onClick={() => {
              setJournalId(journalId)
              setOpenJournalDeleteDialog(true)
            }}
          >
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
