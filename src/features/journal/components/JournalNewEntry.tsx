'use client'

import { JournalNewEntryProps } from '../types'
import { type Extension, useEditor } from '@tiptap/react'
import { extensions } from './JournalTextEditor'
import { Badge } from '@/features/shared/components/ui/badge'
import { JournalNewEntryEditor } from './JournalNewEntryEditor'
import { FutureSelfJournalSuggestions } from './FutureSelfJournalSuggestions'
import { useState } from 'react'
import { FutureSelfJournalExamplesDialog } from './FutureSelfJournalExamplesDialog'

export function JournalNewEntry({
  journal,
  showSuggestions,
  setShowSuggestions,
}: JournalNewEntryProps) {
  const [openExamplesDialog, setOpenExamplesDialog] = useState(false)

  const editor = useEditor({
    extensions: extensions as Extension[],
    immediatelyRender: false,
  })

  return (
    <div className="space-y-4">
      <FutureSelfJournalSuggestions
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        type={journal.type}
        editor={editor}
        setOpenExamplesDialog={setOpenExamplesDialog}
      />

      <div className="flex items-center gap-2">
        <Badge>New Entry</Badge>
        <p className="text-sm text-muted-foreground">Add a journal entry for today</p>
      </div>

      <JournalNewEntryEditor journalId={journal._id} editor={editor} />

      <FutureSelfJournalExamplesDialog
        open={openExamplesDialog}
        setOpen={setOpenExamplesDialog}
        editor={editor}
      />
    </div>
  )
}
