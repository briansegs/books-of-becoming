'use client'

import { JournalDailyEntryItemProps } from '../types'
import { JournalDailyEntry } from './JournalDailyEntry'
import { useState } from 'react'
import { Badge } from '@/features/shared/components/ui/badge'
import { Separator } from '@/features/shared/components/ui/separator'
import { format } from 'date-fns'
import { JournalEditEntryEditor } from './JournalEditEntryEditor'

export function JournalDailyEntryItem({
  entry,
  index,
  setOpenDeleteDialog,
  currentEntryGroup,
  editorLabel,
}: JournalDailyEntryItemProps) {
  const [editMode, setEditMode] = useState(false)

  return editMode && entry ? (
    <div className="space-y-4 px-8">
      <div className="mt-4 flex items-center gap-2">
        <Badge>{editorLabel}</Badge>
        <p className="text-sm text-muted-foreground">
          {entry.title
            ? entry.title
            : format(new Date(entry._creationTime), 'MMMM dd, yyyy @ h:mm aaa')}
        </p>
      </div>

      <JournalEditEntryEditor selectedEntry={entry} setEditMode={setEditMode} />

      <Separator />
    </div>
  ) : (
    <JournalDailyEntry
      key={entry?._creationTime}
      entry={entry}
      index={index}
      setOpenDeleteDialog={setOpenDeleteDialog}
      currentEntryGroup={currentEntryGroup}
      setEditMode={setEditMode}
    />
  )
}
