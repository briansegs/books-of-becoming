import { Lightbulb, LightbulbOff } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'
import { JournalShowSuggestionsToggleProps } from '../types'

export function JournalShowSuggestionsToggle({
  showSuggestions,
  setShowSuggestions,
}: JournalShowSuggestionsToggleProps) {
  return (
    <Button size="icon" onClick={() => setShowSuggestions((prev) => !prev)}>
      {showSuggestions ? <Lightbulb /> : <LightbulbOff />}
    </Button>
  )
}
