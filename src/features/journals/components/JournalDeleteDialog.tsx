'use client'

import { toast } from 'sonner'
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
import { deleteJournal } from '@/app/actions/journalActions'
import { parseActionError } from '@/utilities/parseActionError'
import { Button } from '@/features/shared/components/ui/button'
import { Spinner } from '@/features/shared/components/ui/spinner'
import { JournalDeleteDialogProps } from '../types'

export function JournalDeleteDialog({ journal, open, setOpen }: JournalDeleteDialogProps) {
  const { execute, isPending } = useAction(deleteJournal, {
    onSuccess: () => {
      toast.success('Journal deleted!')
      setOpen(false)
    },
    onError: (actionError) => {
      toast.error(parseActionError(actionError.error))
    },
  })

  function handleDeleteJournal() {
    if (!journal?._id) {
      console.error("Can't handle delete. Missing journal Id.")
      toast.error('Unable to delete journal. Please try again.')
      return
    }

    execute({ journalId: journal._id })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This journal will be deleted and you will not be able to
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
