import { Lightbulb, LightbulbOff } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'
import { JournalShowSuggestionsToggleProps } from '../types'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'

export function JournalShowSuggestionsToggle({
  showSuggestions,
  setShowSuggestions,
}: JournalShowSuggestionsToggleProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" onClick={() => setShowSuggestions((prev) => !prev)}>
          {showSuggestions ? <Lightbulb /> : <LightbulbOff />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p>Toggle Suggestions</p>
      </TooltipContent>
    </Tooltip>
  )
}
