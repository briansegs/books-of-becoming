import { Check, Lightbulb, Sparkles, X } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'
import { JournalSuggestionsProps } from '../types'
import { journalSuggestions } from '../data/journalSuggestions'
import { useState } from 'react'

export function JournalSuggestions({
  type,
  showSuggestions,
  setShowSuggestions,
  setOpenSuggestionsDialog,
  setTitle,
}: JournalSuggestionsProps) {
  const [randomSuggestion] = useState(() => {
    const flatItems = journalSuggestions.map((s) => s.items).flat()
    return (
      flatItems[Math.floor(Math.random() * flatItems.length)] || 'What are you grateful for today?'
    )
  })

  function insertSuggestedText() {
    setTitle(randomSuggestion)
  }

  function openSuggestions() {
    setOpenSuggestionsDialog(true)
  }

  if (type === 'default' && showSuggestions) {
    return (
      <div className="relative mb-6 flex w-full flex-col items-start justify-between gap-2 bg-accent p-2 pr-14 lg:flex-row lg:items-center lg:gap-0">
        <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-0">
          <div className="flex items-center gap-1">
            <Lightbulb className="text-muted-foreground" />
            <p className="font-semibold text-primary">Entry Suggestion:</p>
          </div>

          <p className="ml-2 text-sm text-muted-foreground">{randomSuggestion}</p>
        </div>

        <div className="ml-2 flex items-center gap-2">
          <Button onClick={insertSuggestedText}>
            <Check /> Use
          </Button>

          <Button onClick={openSuggestions}>
            <Sparkles /> See All
          </Button>
        </div>

        <Button
          className="absolute right-1"
          variant="ghost"
          onClick={() => setShowSuggestions(false)}
          aria-label="Dismiss suggestions"
        >
          <X aria-hidden="true" />
        </Button>
      </div>
    )
  }

  return null
}
