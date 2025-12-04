'use client'

import { Separator } from '@/features/shared/components/ui/separator'
import { BlockquoteToolbar } from '@/components/toolbars/blockquote'
import { BoldToolbar } from '@/components/toolbars/bold'
import { BulletListToolbar } from '@/components/toolbars/bullet-list'
import { CodeToolbar } from '@/components/toolbars/code'
import { CodeBlockToolbar } from '@/components/toolbars/code-block'
import { HardBreakToolbar } from '@/components/toolbars/hard-break'
import { HorizontalRuleToolbar } from '@/components/toolbars/horizontal-rule'
import { ItalicToolbar } from '@/components/toolbars/italic'
import { OrderedListToolbar } from '@/components/toolbars/ordered-list'
import { RedoToolbar } from '@/components/toolbars/redo'
import { StrikeThroughToolbar } from '@/components/toolbars/strikethrough'
import { ToolbarProvider } from '@/components/toolbars/toolbar-provider'
import { UndoToolbar } from '@/components/toolbars/undo'
import { EditorContent, type Extension, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAction } from 'next-safe-action/hooks'
import { createEntry } from '@/app/actions/EntryActions'
import { parseActionError } from '@/utilities/parseActionError'
import { toast } from 'sonner'
import z from 'zod'
import { createEntrySchema } from '@/app/actions/schemas'
import { Button } from '@/features/shared/components/ui/button'
import { Spinner } from '@/features/shared/components/ui/spinner'
import { useState } from 'react'
import { Id } from 'convex/_generated/dataModel'
import { Input } from '@/features/shared/components/ui/input'
import { Placeholder } from '@tiptap/extensions'

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc',
      },
    },
    code: {
      HTMLAttributes: {
        class: 'bg-accent rounded-md p-1',
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: 'my-2',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'bg-primary text-primary-foreground p-2 text-sm rounded-md p-1',
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: 'tiptap-heading',
      },
    },
  }),
  Placeholder.configure({
    placeholder: 'Begin your entry here…',
    showOnlyWhenEditable: true,
  }),
]

export type JournalTextEditorProps = {
  journalId: Id<'journals'>
}

export function JournalTextEditor({ journalId }: JournalTextEditorProps) {
  const [title, setTitle] = useState<string>('')

  const editor = useEditor({
    extensions: extensions as Extension[],
    immediatelyRender: false,
  })

  const { execute, isPending } = useAction(createEntry, {
    onSuccess: () => {
      toast.success('Entry Saved!')
    },
    onError: (actionError) => {
      toast.error(parseActionError(actionError.error))
    },
  })

  if (!editor) {
    return null
  }

  async function handleSubmit(values: z.infer<typeof createEntrySchema>) {
    execute(values)
    editor?.commands.clearContent()
    setTitle('')
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full overflow-hidden rounded-md border pb-3">
        <div className="sticky top-0 left-0 z-20 flex w-full items-center justify-between border-b bg-background px-2 py-2">
          <ToolbarProvider editor={editor}>
            <div className="flex items-center gap-2">
              <UndoToolbar />
              <RedoToolbar />
              <Separator orientation="vertical" className="h-7" />
              <BoldToolbar />
              <ItalicToolbar />
              <StrikeThroughToolbar />
              <BulletListToolbar />
              <OrderedListToolbar />
              <CodeToolbar />
              <CodeBlockToolbar />
              <HorizontalRuleToolbar />
              <BlockquoteToolbar />
              <HardBreakToolbar />
            </div>
          </ToolbarProvider>
        </div>

        <div className="flex items-center">
          <Input
            placeholder="Title..."
            className="my-4 border-0 text-2xl shadow-none placeholder:text-2xl placeholder:text-accent focus-visible:ring-0 focus-visible:outline-none md:text-2xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div
          onClick={() => {
            editor?.chain().focus().run()
          }}
          className="min-h-[18rem] cursor-text bg-background"
        >
          <EditorContent className="outline-none" editor={editor} />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        onClick={() => handleSubmit({ title, content: editor?.getHTML(), journalId })}
      >
        {isPending ? (
          <span className="flex gap-2">
            <Spinner /> Saving...
          </span>
        ) : (
          'Save'
        )}
      </Button>
    </div>
  )
}
