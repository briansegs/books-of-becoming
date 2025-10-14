'use client'

import { useMemo, useState } from 'react'
import { Journal } from '@/features/journals/types'

import { JournalContentMenu } from './JournalContentMenu'
import { JournalSuggestions } from './JournalSuggestions'
import { JournalEntriesCarousel } from './JournalEntriesCarousel'
import { JournalTextEditor } from './JournalTextEditor'

export type JournalEntry = {
  id: string
  date: string
  content?: string
  title?: string
}

type JournalContentProps = Pick<Journal, 'type'> & {
  entries: JournalEntry[]
}

export type Group = { date: string; entries: JournalEntry[] }

export function JournalContent({ entries, type }: JournalContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [entries],
  )

  const groupedEntries = useMemo(() => {
    const groups: Group[] = []

    sortedEntries.forEach((entry) => {
      const dateKey = new Date(entry.date).toISOString().split('T')[0] || ''

      let group = groups.find((g) => g.date === dateKey)

      if (!group) {
        group = { date: dateKey, entries: [] } as Group
        groups.push(group)
      }

      group.entries.push(entry)
    })

    return groups
  }, [sortedEntries])

  const currentEntry = groupedEntries[currentIndex]

  const isToday = currentIndex === groupedEntries.length

  const todayDate = new Date()

  const todayEntries = groupedEntries.find(
    (g) => g.date === todayDate.toISOString().split('T')[0] || '',
  )

  return (
    <div className="relative w-full space-y-4">
      <JournalContentMenu
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        type={type}
        isToday={isToday}
      />

      <JournalEntriesCarousel
        currentEntry={currentEntry}
        groupedEntries={groupedEntries}
        setCurrentIndex={setCurrentIndex}
        todayDate={todayDate}
      />

      <JournalSuggestions
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        isToday={isToday}
        type={type}
      />

      {isToday ? (
        <div className="space-y-4">
          <JournalTextEditor />

          {todayEntries && (
            <div>
              {todayEntries.entries.map((entry) => {
                return <div key={entry.id}>{entry.date}</div>
              })}
            </div>
          )}
        </div>
      ) : (
        <div>
          {currentEntry?.entries.map((entry) => {
            const dateSplit = new Date(entry.date).toISOString().split('T')[0] || ''

            const todayDateSplit = todayDate.toISOString().split('T')[0] || ''

            if (dateSplit === todayDateSplit) return null

            return <div key={entry.id}>{entry.date}</div>
          })}
        </div>
      )}
    </div>
  )
}
