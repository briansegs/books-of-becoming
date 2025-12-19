'use client'

import { useMemo, useState } from 'react'

import { format } from 'date-fns'

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
  dailyEntryGroups,
}: JournalContentProps) {
  const today = useMemo(() => new Date(), [])
  const todaysKey = format(today, 'yyyy-MM-dd')

  const dailyEntries = useMemo(() => {
    const hasToday = dailyEntryGroups.some((g) => g.date === todaysKey)

    const withToday = hasToday
      ? dailyEntryGroups
      : [...dailyEntryGroups, { date: todaysKey, entries: [] }]

    return [...withToday].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [dailyEntryGroups, todaysKey])

  const [currentIndex, setCurrentIndex] = useState(() =>
    dailyEntries.length > 0 ? dailyEntries.length - 1 : 0,
  )

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
