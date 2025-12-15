import { Button } from '@/features/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/features/shared/components/ui/dialog'
import { Separator } from '@/features/shared/components/ui/separator'
import { journalSuggestions } from '../data/journalSuggestions'
import { JournalSuggestionsDialogProps } from '../types'

export function JournalSuggestionsDialog({
  open,
  setOpen,
  setTitle,
}: JournalSuggestionsDialogProps) {
  function insertSuggestionText(text: string) {
    setTitle(text)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">Journal Suggestions</DialogTitle>
          <DialogDescription>
            Use these journal suggestions as a starting point to reflect on your thoughts and
            feelings.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="max-h-[60vh] min-h-0 space-y-6 overflow-y-auto pr-2">
          {journalSuggestions.map((suggestion) => {
            return (
              <div key={suggestion.category} className="space-y-2">
                <h3 className="text-lg font-semibold">{suggestion.category}</h3>

                <div className="space-y-2">
                  {suggestion.items.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2 bg-accent p-2"
                      >
                        <p className="text-muted-foreground">{item}</p>

                        <Button onClick={() => insertSuggestionText(item)}>Use</Button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
