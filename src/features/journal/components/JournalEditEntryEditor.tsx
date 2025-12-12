'use client'

import { useAction } from 'next-safe-action/hooks'
import { updateEntry } from '@/app/actions/entryActions'
import { parseActionError } from '@/utilities/parseActionError'
import { toast } from 'sonner'
import { useState } from 'react'
import { type Extension, useEditor } from '@tiptap/react'
import { JournalEditEntryEditorProps } from '../types'
import { updateEntrySchema } from '@/app/actions/schemas'
import { extensions, JournalTextEditor } from './JournalTextEditor'
import { Button } from '@/features/shared/components/ui/button'
import { Spinner } from '@/features/shared/components/ui/spinner'
import z from 'zod'

export function JournalEditEntryEditor({
  setEditMode,
  selectedEntry,
}: JournalEditEntryEditorProps) {
  const [title, setTitle] = useState(selectedEntry.title ?? '')

  const { execute: executeUpdate, isPending: updateIsPending } = useAction(updateEntry, {
    onSuccess: () => {
      toast.success('Entry Updated!')
      setEditMode(false)
    },
    onError: (actionError) => {
      toast.error(parseActionError(actionError.error))
    },
  })

  const editor = useEditor({
    extensions: extensions as Extension[],
    content: selectedEntry?.content ?? '',
    immediatelyRender: false,
  })

  function handleEdit(values: z.infer<typeof updateEntrySchema>) {
    if (values.title === selectedEntry.title && values.content === selectedEntry.content) {
      toast.info('No changes made to the entry.')
      setEditMode(false)
      return
    }

    executeUpdate(values)
  }

  function handleCancel() {
    setEditMode(false)
  }

  return (
    <div className="space-y-4">
      <JournalTextEditor editor={editor} title={title} setTitle={setTitle} />

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={updateIsPending}
          onClick={() =>
            handleEdit({
              title,
              content: editor?.getHTML() || '',
              entryId: selectedEntry._id,
              journalId: selectedEntry.journalId,
            })
          }
        >
          {updateIsPending ? (
            <span className="flex gap-2">
              <Spinner /> Saving...
            </span>
          ) : (
            'Save'
          )}
        </Button>

        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
