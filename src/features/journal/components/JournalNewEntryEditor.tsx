'use client'

import { useAction } from 'next-safe-action/hooks'
import { createEntry } from '@/app/actions/entryActions'
import { parseActionError } from '@/utilities/parseActionError'
import { toast } from 'sonner'
import { useState } from 'react'
import { JournalNewEntryEditorProps } from '../types'
import { createEntrySchema } from '@/app/actions/schemas'
import { JournalTextEditor } from './JournalTextEditor'
import { Button } from '@/features/shared/components/ui/button'
import { Spinner } from '@/features/shared/components/ui/spinner'
import { z } from 'zod'
import { format } from 'date-fns'

export function JournalNewEntryEditor({ journalId, editor }: JournalNewEntryEditorProps) {
  const [title, setTitle] = useState('')

  const { execute: executeSave, isPending: saveIsPending } = useAction(createEntry, {
    onSuccess: () => {
      toast.success('Entry Saved!')
      editor?.commands.clearContent()
      setTitle('')
    },
    onError: (actionError) => {
      toast.error(parseActionError(actionError.error))
    },
  })

  function handleSave(values: z.infer<typeof createEntrySchema>) {
    const result = createEntrySchema.safeParse(values)

    if (!result.success) {
      const issue = result.error.issues?.[0]
      const message = issue?.message || 'Invalid input.'
      toast.error(message)
      return
    }

    const parsed = result.data

    if (!parsed.title) {
      parsed.title = format(new Date(), 'M/d/yyyy @ h:mm a')
    }

    if (!parsed.content) {
      toast.error('Cannot save an empty entry.')
      return
    }

    executeSave(parsed)
  }

  return (
    <div className="space-y-4">
      <JournalTextEditor editor={editor} title={title} setTitle={setTitle} />

      <Button
        type="button"
        disabled={saveIsPending}
        onClick={() => handleSave({ title, content: editor?.getHTML() || '', journalId })}
      >
        {saveIsPending ? (
          <span className="flex gap-2">
            <Spinner /> Saving...
          </span>
        ) : (
          'Save'
        )}
      </Button>
    </div>
  )
}
