'use client'

import { useState } from 'react'

import { JournalContentMenu } from './JournalContentMenu'
import { JournalSuggestions } from './JournalSuggestions'
import { JournalTextEditor } from './JournalTextEditor'
import { format } from 'date-fns'

import { JournalContentNav } from './JournalContentNav'
import { JournalContentForToday } from './JournalContentForToday'
import { JournalContentForSelectedDay } from './JournalContentForSelectedDay'
import { JournalContentProps } from '../types'

export function JournalContent({ dailyEntries, journal }: JournalContentProps) {
  const [currentIndex, setCurrentIndex] = useState(
    dailyEntries.length > 0 ? dailyEntries.length - 1 : 0,
  )
  const [showSuggestions, setShowSuggestions] = useState(true)

  const todaysKey = format(new Date(), 'yyyy-MM-dd')
  const foundEntryIndex = dailyEntries.findIndex((group) => group.date === todaysKey)
  const todaysIndex = foundEntryIndex >= 0 ? foundEntryIndex : 0

  const isToday = currentIndex === todaysIndex

  const currentEntry = dailyEntries[currentIndex]

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
        currentEntry={currentEntry}
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

          <JournalTextEditor journalId={journal._id} />

          <JournalContentForToday dailyEntries={dailyEntries} todaysDate={todaysDate} />
        </div>
      ) : (
        <JournalContentForSelectedDay currentEntry={currentEntry} />
      )}
    </div>
  )
}
