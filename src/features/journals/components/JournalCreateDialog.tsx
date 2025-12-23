'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/features/shared/components/ui/dialog'
import { Button } from '@/features/shared/components/ui/button'
import { Plus } from 'lucide-react'
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
import { useState } from 'react'
import { createJournal } from '@/app/actions/journalActions'
import { useAction } from 'next-safe-action/hooks'
import { createJournalFormSchema, JOURNAL_TITLE_MAX } from '@/app/actions/schemas'
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
import { JournalDialogSelectField } from './JournalDialogSelectField'
import { Switch } from '@/features/shared/components/ui/switch'

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

type CreateJournalFormData = z.infer<typeof createJournalFormSchema>

export function JournalCreateDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateJournalFormData>({
    resolver: zodResolver(createJournalFormSchema),
    defaultValues: {
      title: '',
      type: 'default',
      color: 'white',
      textColor: 'black',
      background: 'none',
      suggestionsEnabled: true,
    },
  })

  const { execute, isPending } = useAction(createJournal, {
    onSuccess: () => {
      form.reset()
      toast.success('Journal created!')
      setOpen(false)
    },
    onError: (actionError) => {
      toast.error(parseActionError(actionError.error))
    },
  })

  function handleSubmit(values: z.infer<typeof createJournalFormSchema>) {
    execute(values)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          form.reset()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus /> Create a Journal
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Journal</DialogTitle>
          <DialogDescription>Add a journal to make daily entries in</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <div className="flex items-center rounded-md border border-input shadow-sm">
                      <Input className="border-none shadow-none focus-visible:ring-0" {...field} />

                      <p className="pr-3 text-sm text-muted-foreground">
                        <span
                          className={cn(field.value.length > JOURNAL_TITLE_MAX && 'text-red-400')}
                        >
                          {field.value.length}
                        </span>
                        /{JOURNAL_TITLE_MAX}
                      </p>
                    </div>
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

            <FormField
              control={form.control}
              name="suggestionsEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel htmlFor="suggestionsEnabled">Show Suggestions</FormLabel>
                  <FormControl>
                    <Switch
                      id="suggestionsEnabled"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button className="w-32" disabled={isPending} type="submit">
                {isPending ? (
                  <span className="flex gap-2">
                    <Spinner /> Creating...
                  </span>
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
