'use client'

import { useState } from 'react'

import { JournalContentMenu } from './JournalContentMenu'
import { JournalSuggestions } from './JournalSuggestions'
import { format } from 'date-fns'

import { JournalContentNav } from './JournalContentNav'
import { JournalContentForToday } from './JournalContentForToday'
import { JournalContentForSelectedDay } from './JournalContentForSelectedDay'
import { JournalContentProps, JournalEntry, NewEntryEditorWithHeaderProps } from '../types'
import { JournalEntryDeleteDialog } from './JournalEntryDeleteDialog'
import { Badge } from '@/features/shared/components/ui/badge'
import { JournalNewEntryEditor } from './JournalNewEntryEditor'

export function JournalContent({ dailyEntries, journal }: JournalContentProps) {
  const [currentIndex, setCurrentIndex] = useState(
    dailyEntries.length > 0 ? dailyEntries.length - 1 : 0,
  )
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  const todaysKey = format(new Date(), 'yyyy-MM-dd')
  const foundEntryIndex = dailyEntries.findIndex((group) => group.date === todaysKey)
  const todaysIndex = foundEntryIndex >= 0 ? foundEntryIndex : 0

  const isToday = currentIndex === todaysIndex

  const currentEntryGroup = dailyEntries[currentIndex]

  const todaysDate = new Date()

  return (
    <div className="relative w-full space-y-4">
      <JournalContentMenu
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        type={journal.type}
        isToday={isToday}
      />

      <JournalContentNav
        currentEntryGroup={currentEntryGroup}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        dailyEntries={dailyEntries}
        isToday={isToday}
        todaysDate={todaysDate}
      />

      {isToday ? (
        <div className="space-y-4">
          <JournalSuggestions
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            type={journal.type}
          />

          <NewEntryEditorWithHeader journal={journal} />

          <JournalContentForToday
            dailyEntries={dailyEntries}
            todaysDate={todaysDate}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setSelectedEntry={setSelectedEntry}
          />
        </div>
      ) : (
        <JournalContentForSelectedDay
          currentEntryGroup={currentEntryGroup}
          setOpenDeleteDialog={setOpenDeleteDialog}
          setCurrentIndex={setCurrentIndex}
          todaysIndex={todaysIndex}
        />
      )}

      <JournalEntryDeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        selectedEntry={selectedEntry}
      />
    </div>
  )
}

function NewEntryEditorWithHeader({ journal }: NewEntryEditorWithHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge>New Entry</Badge>
        <p className="text-sm text-muted-foreground">Add a journal entry for today</p>
      </div>

      <JournalNewEntryEditor journalId={journal._id} />
    </div>
  )
}
