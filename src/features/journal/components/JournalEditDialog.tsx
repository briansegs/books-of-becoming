'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/features/shared/components/ui/dialog'
import { Button } from '@/features/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/features/shared/components/ui/form'
import { Input } from '@/features/shared/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useCallback, useEffect } from 'react'
import { editJournal } from '@/app/actions/journalActions'
import { useAction } from 'next-safe-action/hooks'
import { editJournalFormSchema } from '@/app/actions/schemas'
import { parseActionError } from '@/utilities/parseActionError'
import { Spinner } from '@/features/shared/components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/features/shared/components/ui/select'
import { cn } from '@/lib/utils'
import { journalColors } from './journalColors'
import { journalBackgrounds } from './journalBackgrounds'
import { JournalEditDialogProps } from '../types'

import { JournalDialogSelectField } from './JournalDialogSelectField'

export const journalBackgroundsLabelMap = {
  none: 'None',
  wovenFabric: 'Woven Fabric',
  diagonalGrid: 'Diagonal Grid',
  crosshatchArt: 'Crosshatch Art',
  zigzagLightning: 'Zigzag Lightning',
  circuitBoard: 'Circuit Board',
  paperTexture: 'Paper Texture',
} as const

export const textColorsBgMap = {
  black: 'bg-black',
  white: 'bg-white',
  gold: 'bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600',
  silver: 'bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-600',
} as const

type JournalColors = keyof typeof journalColors

type JournalBackgrounds = keyof typeof journalBackgrounds

type TextColorsBgMap = keyof typeof textColorsBgMap

type EditJournalFormData = z.infer<typeof editJournalFormSchema>

export function JournalEditDialog({ journal, open, setOpen }: JournalEditDialogProps) {
  const form = useForm<EditJournalFormData>({
    resolver: zodResolver(editJournalFormSchema),
    defaultValues: {
      id: '',
      title: '',
      type: 'default',
      color: 'white',
      textColor: 'black',
      background: 'none',
    },
  })

  const resetWithJournal = useCallback(() => {
    if (journal) {
      form.reset({
        id: journal._id,
        title: journal.title,
        type: journal.type,
        color: journal.color,
        textColor: journal.textColor,
        background: journal.background,
      })
    }
  }, [journal, form])

  useEffect(() => {
    resetWithJournal()
  }, [resetWithJournal])

  const { execute, isPending } = useAction(editJournal, {
    onSuccess: () => {
      form.reset()
      toast.success('Journal edited!')
      setOpen(false)
    },
    onError: (actionError) => {
      toast.error(parseActionError(actionError.error))
    },
  })

  async function handleSubmit(values: z.infer<typeof editJournalFormSchema>) {
    if (!journal) {
      console.error("Can't handle edit. Missing journal.")
      toast.error('Unable to edit journal. Please try again.')
      return
    }

    execute(values)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) resetWithJournal()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Journal</DialogTitle>
          <DialogDescription>
            Edit this journal by changing the information in any field.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => <input type="hidden" {...field} value={journal?._id || ''} />}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journal Type</FormLabel>

                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Default" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="future">Future Self</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <JournalDialogSelectField
              label="Journal Color"
              control={form.control}
              name="color"
              items={journalColors}
              preview={(key) => (
                <div
                  className={cn(
                    'size-12 rounded-md border',
                    journalColors[key as JournalColors].bg,
                  )}
                />
              )}
            />

            <JournalDialogSelectField
              label="Text Color"
              control={form.control}
              name="textColor"
              items={textColorsBgMap}
              preview={(key) => (
                <div
                  className={cn(
                    'size-12 rounded-md border',
                    textColorsBgMap[key as TextColorsBgMap],
                  )}
                />
              )}
            />

            <JournalDialogSelectField
              label="Background"
              control={form.control}
              name="background"
              items={journalBackgrounds}
              preview={(key) => (
                <div className="relative size-12 rounded-md border bg-zinc-100">
                  {journalBackgrounds[key as JournalBackgrounds]}
                </div>
              )}
            />

            <DialogFooter>
              <Button className="w-32" disabled={isPending} type="submit">
                {isPending ? (
                  <span className="flex gap-2">
                    <Spinner /> Editing...
                  </span>
                ) : (
                  'Edit'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
