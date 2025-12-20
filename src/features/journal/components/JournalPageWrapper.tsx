'use client'

import { JournalContent } from '@/features/journal/components/JournalContent'
import { JournalHeader } from '@/features/journal/components/JournalHeader'

import { Separator } from '@/features/shared/components/ui/separator'
import { useMemo, useState } from 'react'
import { JournalPageWrapperProps } from '../types'
import { format } from 'date-fns'

export function JournalPageWrapper({
  journal,
  entriesCount,
  dailyEntryGroups,
}: JournalPageWrapperProps) {
  const [showSuggestions, setShowSuggestions] = useState(journal.suggestionsEnabled)

  const today = useMemo(() => new Date(), [])
  const todaysKey = format(today, 'yyyy-MM-dd')

  const dailyEntries = useMemo(() => {
    const hasToday = dailyEntryGroups.some((g) => g.date === todaysKey)

    const withToday = hasToday
      ? dailyEntryGroups
      : [...dailyEntryGroups, { date: todaysKey, entries: [] }]

    return [...withToday].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [dailyEntryGroups, todaysKey])

  const [currentIndex, setCurrentIndex] = useState(
    dailyEntries.length > 0 ? dailyEntries.length - 1 : 0,
  )

  return (
    <div className="min-h-screen w-full space-y-6 px-12 py-6">
      <JournalHeader
        journal={journal}
        entriesCount={entriesCount}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        dailyEntries={dailyEntries}
        setCurrentIndex={setCurrentIndex}
      />

      <Separator />

      <JournalContent
        journal={journal}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        dailyEntries={dailyEntries}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        today={today}
        todaysKey={todaysKey}
      />
    </div>
  )
}
