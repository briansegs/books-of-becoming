'use client'

import { JournalContent } from '@/features/journal/components/JournalContent'
import { JournalHeader } from '@/features/journal/components/JournalHeader'

import { Separator } from '@/features/shared/components/ui/separator'
import { useState } from 'react'
import { JournalPageWrapperProps } from '../types'

export function JournalPageWrapper({
  journal,
  dailyEntries,
  entriesCount,
}: JournalPageWrapperProps) {
  const [showSuggestions, setShowSuggestions] = useState(journal.suggestionsEnabled)

  return (
    <div className="min-h-screen w-full space-y-6 px-12 py-6">
      <JournalHeader
        journal={journal}
        entriesCount={entriesCount}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />

      <Separator />

      <JournalContent
        dailyEntries={dailyEntries}
        journal={journal}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />
    </div>
  )
}
