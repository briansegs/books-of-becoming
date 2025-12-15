import { Check, Lightbulb, Sparkles, X } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'
import { JournalSuggestionsProps } from '../types'
import { journalSuggestions } from '../data/journalSuggestions'

const flatItems = journalSuggestions.map((s) => s.items).flat()

const randomSuggestion =
  flatItems[Math.floor(Math.random() * flatItems.length)] || 'What are you grateful for today?'

export function JournalSuggestions({
  type,
  showSuggestions,
  setShowSuggestions,
  setOpenSuggestionsDialog,
  setTitle,
}: JournalSuggestionsProps) {
  function insertSuggestedText() {
    setTitle(randomSuggestion)
  }

  function openSuggestions() {
    setOpenSuggestionsDialog(true)
  }

  if (type === 'default' && showSuggestions) {
    return (
      <div>
        <div className="flex w-full items-center justify-between bg-accent p-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="text-muted-foreground" />
            <p className="font-semibold text-primary">Entry Suggestion:</p>
            <p className="text-sm text-muted-foreground">{randomSuggestion}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={insertSuggestedText}>
              <Check /> Use
            </Button>

            <Button onClick={openSuggestions}>
              <Sparkles /> See All
            </Button>

            <Button variant="ghost" onClick={() => setShowSuggestions(false)}>
              <X />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
