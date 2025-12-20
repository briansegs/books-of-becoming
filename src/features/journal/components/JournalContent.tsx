'use client'

import { useMemo, useState } from 'react'

import { JournalContentNav } from './JournalContentNav'
import { JournalContentForToday } from './JournalContentForToday'
import { JournalContentForSelectedDay } from './JournalContentForSelectedDay'
import { JournalContentProps, JournalEntry } from '../types'
import { JournalEntryDeleteDialog } from './JournalEntryDeleteDialog'
import { JournalNewEntry } from './JournalNewEntry'

export function JournalContent({
  journal,
  showSuggestions,
  setShowSuggestions,
  dailyEntries,
  currentIndex,
  setCurrentIndex,
  today,
  todaysKey,
}: JournalContentProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  const todaysIndex = useMemo(
    () => dailyEntries.findIndex((g) => g.date === todaysKey),
    [dailyEntries, todaysKey],
  )

  const isToday = currentIndex === todaysIndex
  const currentEntryGroup = dailyEntries[currentIndex]

  return (
    <div className="relative w-full space-y-4">
      <JournalContentNav
        currentEntryGroup={currentEntryGroup}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        dailyEntries={dailyEntries}
        isToday={isToday}
        todaysDate={today}
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
            todaysDate={today}
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
