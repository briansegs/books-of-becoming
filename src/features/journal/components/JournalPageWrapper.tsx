'use client'

import { JournalContent } from '@/features/journal/components/JournalContent'
import { JournalHeader } from '@/features/journal/components/JournalHeader'

import { Separator } from '@/features/shared/components/ui/separator'
import { useEffect, useMemo, useState } from 'react'
import { JournalPageWrapperProps } from '../types'
import { format } from 'date-fns'

export function JournalPageWrapper({
  journal,
  entriesCount,
  dailyEntryGroups,
}: JournalPageWrapperProps) {
  const [showSuggestions, setShowSuggestions] = useState(journal.suggestionsEnabled)
  const [today, setToday] = useState(() => new Date())

  // Compute todaysKey
  const todaysKey = useMemo(() => format(today, 'yyyy-MM-dd'), [today])

  // Build dailyEntries with today ensured
  const dailyEntries = useMemo(() => {
    const hasToday = dailyEntryGroups.some((g) => g.date === todaysKey)
    const withToday = hasToday
      ? dailyEntryGroups
      : [...dailyEntryGroups, { date: todaysKey, entries: [] }]

    return [...withToday].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [dailyEntryGroups, todaysKey])

  // Initialize requestedIndex to today
  const [requestedIndex, setRequestedIndex] = useState(() => {
    const todayIndex = dailyEntries.findIndex((g) => g.date === todaysKey)
    return todayIndex >= 0 ? todayIndex : dailyEntries.length - 1
  })

  // Update today when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') setToday(new Date())
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Cleaned-up currentIndex logic
  const currentIndex = useMemo(() => {
    if (dailyEntries.length === 0) return 0
    let idx = Math.min(requestedIndex, dailyEntries.length - 1)
    const current = dailyEntries[idx]

    if (current?.date === todaysKey && (current.entries.length ?? 0) === 0) {
      idx = Math.min(idx + 1, dailyEntries.length - 1)
    }
    return idx
  }, [requestedIndex, dailyEntries, todaysKey])

  // Midnight rollover + next-day jump
  useEffect(() => {
    if (dailyEntries.length === 0) return

    const scheduleMidnightUpdate = () => {
      const now = new Date()
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
        0,
      )
      const msUntilNext = nextMidnight.getTime() - now.getTime()

      const timeoutId = setTimeout(() => {
        setToday(new Date())

        const idx = requestedIndex
        const current = dailyEntries[idx]
        if (
          current?.date === format(new Date(), 'yyyy-MM-dd') &&
          (current.entries.length ?? 0) === 0
        ) {
          setRequestedIndex(Math.min(idx + 1, dailyEntries.length - 1))
        }

        scheduleMidnightUpdate()
      }, msUntilNext)

      return () => clearTimeout(timeoutId)
    }

    const cleanup = scheduleMidnightUpdate()
    return cleanup
  }, [dailyEntries, requestedIndex])

  return (
    <div className="min-h-screen w-full space-y-6 px-12 py-6">
      <JournalHeader
        journal={journal}
        entriesCount={entriesCount}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        dailyEntries={dailyEntries}
        setCurrentIndex={setRequestedIndex}
      />

      <Separator />

      <JournalContent
        journal={journal}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        dailyEntries={dailyEntries}
        currentIndex={currentIndex}
        setCurrentIndex={setRequestedIndex}
        today={today}
        todaysKey={todaysKey}
      />
    </div>
  )
}
