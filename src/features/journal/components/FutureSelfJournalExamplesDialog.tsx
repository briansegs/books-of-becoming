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

// TODO: Refactor

const ex1 = {
  title: 'For those wanting to practice becoming conscious',
  lines: [
    'Today I am practicing living consciously.',
    'I am grateful for another opportunity to practice being conscious.',
    'Today, I am present.',
    'Change in this area allows me to feel more connected with myself + others.',
    'Today I am practicing when I practice noticing where my attention is + bring it back to the present moment.',
  ],
}

const ex2 = {
  title: 'For those wanting to work on emotional reactivity',
  lines: [
    'Today I am practicing using my breath to regulate my feelings.',
    'I am grateful for another opportunity to practice a new way to regulate my feelings.',
    'Today, I am calm + at peace.',
    'Change in this area allows me to feel more in control of my responses to my feelings.',
    'Today I am practicing when I use deep belly breaths to calm my feelings when I speak with my partner.',
  ],
}

const ex3 = {
  title: 'For those wanting to work on meeting the needs of their inner child',
  lines: [
    'Today I am practicing allowing myself to feel worthy of love.',
    'I am grateful for another opportunity to practice allowing myself to feel worthy of love.',
    'Today, I am worthy of love.',
    'Change in this area allows me to feel more positive about myself in my relationships.',
    'Today I am practicing when I use my affirmation ("I am worthy of love") when my mind tries to tell me otherwise.',
  ],
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

const examples = [
  {
    title: ex1.title,
    list: getExampleList(ex1.lines),
    content: getExampleContent(ex1.lines),
  },
  {
    title: ex2.title,
    list: getExampleList(ex2.lines),
    content: getExampleContent(ex2.lines),
  },
  {
    title: ex3.title,
    list: getExampleList(ex3.lines),
    content: getExampleContent(ex3.lines),
  },
]

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
