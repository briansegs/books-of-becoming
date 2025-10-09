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
import { createJournalFormSchema } from '@/app/actions/schemas'
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

export const journalBackgroundsLabelMap = {
  none: 'None',
  wovenFabric: 'Woven Fabric',
  diagonalGrid: 'Diagonal Grid',
  crosshatchArt: 'Crosshatch Art',
  zigzagLightning: 'Zigzag Lightning',
  circuitBoard: 'Circuit Board',
  paperTexture: 'Paper Texture',
}

export const textColorsBgMap = {
  black: 'bg-black',
  white: 'bg-white',
  gold: 'bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600',
  silver: 'bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-600',
}

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

  async function handleSubmit(values: z.infer<typeof createJournalFormSchema>) {
    execute({
      title: values.title,
      type: values.type,
      color: values.color,
      textColor: values.textColor,
      background: values.background,
    })
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

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journal Color</FormLabel>

                  <div className="flex w-full items-center justify-between">
                    <div
                      className={cn('size-12 rounded-md border', journalColors[field.value].bg)}
                    />

                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[180px] capitalize">
                          {field.value}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(journalColors).map(([key, value]) => {
                          return (
                            <SelectItem className="capitalize" key={key} value={key}>
                              <div className={cn('size-8 rounded-md border', value.bg)} />
                              {key}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="textColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journal Text Color</FormLabel>

                  <div className="flex w-full items-center justify-between">
                    <div
                      className={cn('size-12 rounded-md border', textColorsBgMap[field.value])}
                    />

                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[180px] capitalize">
                          {field.value}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(textColorsBgMap).map(([key, value]) => {
                          return (
                            <SelectItem className="capitalize" key={key} value={key}>
                              <div className={cn('size-8 rounded-md border', value)} />
                              {key}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="background"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journal Background</FormLabel>

                  <div className="flex w-full items-center justify-between">
                    <div className={cn('relative size-12 rounded-md border bg-zinc-100')}>
                      {journalBackgrounds[field.value]}
                    </div>

                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[180px] capitalize">
                          {field.value}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(journalBackgrounds).map(([key, value]) => {
                          return (
                            <SelectItem className="capitalize" key={key} value={key}>
                              <div className={cn('relative size-8 rounded-md border bg-zinc-100')}>
                                {value}
                              </div>
                              {
                                journalBackgroundsLabelMap[
                                  key as keyof typeof journalBackgroundsLabelMap
                                ]
                              }
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

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
