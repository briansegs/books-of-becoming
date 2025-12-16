'use client'

import { useState } from 'react'

import { format } from 'date-fns'

import { JournalContentNav } from './JournalContentNav'
import { JournalContentForToday } from './JournalContentForToday'
import { JournalContentForSelectedDay } from './JournalContentForSelectedDay'
import { JournalContentProps, JournalEntry } from '../types'
import { JournalEntryDeleteDialog } from './JournalEntryDeleteDialog'
import { JournalNewEntry } from './JournalNewEntry'

export function JournalContent({
  dailyEntries,
  journal,
  showSuggestions,
  setShowSuggestions,
}: JournalContentProps) {
  const [currentIndex, setCurrentIndex] = useState(
    dailyEntries.length > 0 ? dailyEntries.length - 1 : 0,
  )
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
          <JournalNewEntry
            journal={journal}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
          />

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
