'use client'

import { JournalContent } from '@/features/journal/components/JournalContent'
import { JournalHeader } from '@/features/journal/components/JournalHeader'

import { Separator } from '@/features/shared/components/ui/separator'
import { useEffect, useMemo, useRef, useState } from 'react'
import { JournalPageWrapperProps } from '../types'
import { format } from 'date-fns'

export function JournalPageWrapper({
  journal,
  entriesCount,
  dailyEntryGroups,
}: JournalPageWrapperProps) {
  const [showSuggestions, setShowSuggestions] = useState(journal.suggestionsEnabled)
  const [today, setToday] = useState(() => new Date())

  const todaysKey = useMemo(() => format(today, 'yyyy-MM-dd'), [today])

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

  const currentIndex = useMemo(() => {
    if (dailyEntries.length === 0) return 0
    let idx = Math.min(requestedIndex, dailyEntries.length - 1)
    const current = dailyEntries[idx]

    if (current?.date === todaysKey && (current.entries.length ?? 0) === 0) {
      idx = Math.min(idx + 1, dailyEntries.length - 1)
    }
    return idx
  }, [requestedIndex, dailyEntries, todaysKey])

  // Midnight rollover
  useEffect(() => {
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
        scheduleMidnightUpdate()
      }, msUntilNext)

      return () => clearTimeout(timeoutId)
    }

    const cleanup = scheduleMidnightUpdate()
    return cleanup
  }, [])

  const prevTodaysKeyRef = useRef(todaysKey)
  useEffect(() => {
    // Only run navigation logic when todaysKey actually changes
    if (prevTodaysKeyRef.current !== todaysKey) {
      const current = dailyEntries[requestedIndex]
      if (current?.date === todaysKey && (current.entries.length ?? 0) === 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional navigation when date changes at midnight
        setRequestedIndex((prev) => Math.min(prev + 1, dailyEntries.length - 1))
      }
      prevTodaysKeyRef.current = todaysKey
    }
  }, [todaysKey, dailyEntries, requestedIndex])

  return (
    <div className="min-h-screen w-full space-y-6 px-12 py-6">
      <button onClick={() => setToday(new Date(today.getTime() + 24 * 60 * 60 * 1000))}>
        Simulate next day
      </button>
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
