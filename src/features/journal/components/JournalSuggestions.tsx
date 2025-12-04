import { Dispatch, SetStateAction } from 'react'
import { Check, Lightbulb, Sparkles, X } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'

export type JournalSuggestionsProps = {
  type: string
  showSuggestions: boolean
  setShowSuggestions: Dispatch<SetStateAction<boolean>>
}

export function JournalSuggestions({
  type,
  showSuggestions,
  setShowSuggestions,
}: JournalSuggestionsProps) {
  if (type === 'future' && showSuggestions) {
    return (
      <div className="">
        <div className="flex w-full items-center justify-between bg-accent p-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="text-muted-foreground" />
            <p className="font-semibold text-primary">Future Self Journaling Starter:</p>
          </div>

          <div className="flex items-center gap-2">
            <Button>
              <Check /> Use
            </Button>

            <Button>
              <Sparkles /> Examples
            </Button>

            <Button variant="ghost" onClick={() => setShowSuggestions(false)}>
              <X />
            </Button>
          </div>
        </div>

        <div className="border border-t-0">
          <article className="prose p-4 dark:prose-invert">
            <ul>
              <li>Today I am practicing...</li>
              <li>I am grateful for...</li>
              <li>Today, I am...</li>
              <li>Change in ths area allows me to feel...</li>
              <li>Today I am practicing when...</li>
            </ul>
          </article>
        </div>
      </div>
    )
  }

  return null
}
