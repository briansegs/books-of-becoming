import { Check, Lightbulb, Sparkles, X } from 'lucide-react'
import { Button } from '@/features/shared/components/ui/button'
import { FutureSelfJournalSuggestionsProps } from '../types'

const starterText =
  '<p>Today I am practicing<br/> I am grateful for<br/> Today, I am<br/> Change in this area allows me to feel<br/> Today I am practicing when</p>'

export function FutureSelfJournalSuggestions({
  type,
  showSuggestions,
  setShowSuggestions,
  editor,
  setOpenExamplesDialog,
}: FutureSelfJournalSuggestionsProps) {
  function insertStarterText() {
    if (editor) {
      editor.chain().focus().insertContent(starterText).run()
    }
  }

  function openExamples() {
    setOpenExamplesDialog(true)
  }

  if (type === 'future' && showSuggestions) {
    return (
      <div className="mb-6">
        <div className="relative flex w-full flex-col items-start justify-between gap-2 bg-accent p-2 pr-14 lg:flex-row lg:items-center lg:gap-0">
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-0">
            <div className="flex items-center gap-1">
              <Lightbulb className="text-muted-foreground" />
              <p className="font-semibold text-primary">Future Self Journal Starter:</p>
            </div>

            <p className="ml-2 text-sm text-muted-foreground">
              {'Click the "Use" button to add the starter text to your text editor.'}
            </p>
          </div>

          <div className="ml-2 flex items-center gap-2">
            <Button onClick={insertStarterText}>
              <Check /> Use
            </Button>

            <Button onClick={openExamples}>
              <Sparkles /> Examples
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

        <div className="border border-t-0">
          <article className="prose p-4 dark:prose-invert">
            <ul>
              <li>Today I am practicing...</li>
              <li>I am grateful for...</li>
              <li>Today, I am...</li>
              <li>Change in this area allows me to feel...</li>
              <li>Today I am practicing when...</li>
            </ul>
          </article>
        </div>
      </div>
    )
  }

  return null
}
