'use client'

import { useAction } from 'next-safe-action/hooks'
import { createEntry } from '@/app/actions/entryActions'
import { parseActionError } from '@/utilities/parseActionError'
import { toast } from 'sonner'
import { useState } from 'react'
import { type Extension, useEditor } from '@tiptap/react'
import { JournalNewEntryEditorProps } from '../types'
import { createEntrySchema } from '@/app/actions/schemas'
import { extensions, JournalTextEditor } from './JournalTextEditor'
import { Button } from '@/features/shared/components/ui/button'
import { Spinner } from '@/features/shared/components/ui/spinner'
import z from 'zod'

export function JournalNewEntryEditor({ journalId }: JournalNewEntryEditorProps) {
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

  const editor = useEditor({
    extensions: extensions as Extension[],
    immediatelyRender: false,
  })

  function handleSave(values: z.infer<typeof createEntrySchema>) {
    executeSave(values)
  }

  return (
    <div className="space-y-4">
      <JournalTextEditor editor={editor} title={title} setTitle={setTitle} />

      <Button
        type="submit"
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
