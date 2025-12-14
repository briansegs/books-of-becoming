import { Button } from '@/features/shared/components/ui/button'
import { FutureSelfJournalExamplesDialogProps } from '../types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/features/shared/components/ui/dialog'
import { Separator } from '@/features/shared/components/ui/separator'
import { futureSelfJournalExamples } from '../data/FSJExamples'

const examples = futureSelfJournalExamples.map((ex) => ({
  title: ex.title,
  list: getExampleList(ex.lines),
  content: getExampleContent(ex.lines),
}))

export function FutureSelfJournalExamplesDialog({
  open,
  setOpen,
  editor,
}: FutureSelfJournalExamplesDialogProps) {
  function insertExampleText(text: string) {
    if (editor) {
      editor.chain().focus().insertContent(text).run()
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">Daily Prompt examples</DialogTitle>
          <DialogDescription>
            Feel free to use these examples as inspiration or a starting point.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="max-h-[60vh] min-h-0 space-y-6 overflow-y-auto pr-2">
          {examples.map((example, index) => {
            return (
              <div key={example.title}>
                <h3 className="text-lg font-semibold">{example.title}</h3>

                <div className="flex items-center justify-between gap-2">
                  <article className="prose p-4 dark:prose-invert">{example.list}</article>

                  <Button onClick={() => insertExampleText(example.content)}>Use</Button>
                </div>

                {index < examples.length - 1 && <Separator className="" />}
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getExampleList(example: string[]) {
  return (
    <ul>
      {example.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  )
}

function getExampleContent(example: string[]) {
  return example.map((line) => `<p>${line}</p>`).join('')
}
