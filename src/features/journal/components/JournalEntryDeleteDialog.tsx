import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/features/shared/components/ui/alert-dialog'
import { useAction } from 'next-safe-action/hooks'
import { deleteEntry } from '@/app/actions/entryActions'
import { parseActionError } from '@/utilities/parseActionError'
import { Button } from '@/features/shared/components/ui/button'
import { Spinner } from '@/features/shared/components/ui/spinner'
import { toast } from 'sonner'
import { JournalEntryDeleteDialogProps } from '../types'
import { Id } from 'convex/_generated/dataModel'

export function JournalEntryDeleteDialog({
  open,
  setOpen,
  selectedEntry,
}: JournalEntryDeleteDialogProps) {
  const journalId = selectedEntry?.journalId
  const entryId = selectedEntry?._id

  const { execute, isPending } = useAction(deleteEntry, {
    onSuccess: () => {
      toast.success('Entry deleted!')
      setOpen(false)
    },
    onError: (actionError) => {
      toast.error(parseActionError(actionError.error))
    },
  })

  async function handleDeleteJournal() {
    if (!entryId || !journalId) {
      console.error("Can't handle delete. Missing entry Id or journal Id.")
      toast.error('Unable to delete entrry. Please try again.')
      return
    }

    execute({ entryId: entryId as Id<'entries'>, journalId: journalId as Id<'journals'> })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This entry will be deleted and you will not be able to
            view or edit it again.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="w-32" disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <Button
            className="w-32"
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteJournal}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Spinner /> Deleting...
              </span>
            ) : (
              'Delete'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
