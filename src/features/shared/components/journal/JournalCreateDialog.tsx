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

type CreateJournalFormData = z.infer<typeof createJournalFormSchema>

export function JournalCreateDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateJournalFormData>({
    resolver: zodResolver(createJournalFormSchema),
    defaultValues: {
      title: '',
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
    execute({ title: values.title })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

            <DialogFooter>
              <Button disabled={isPending} type="submit">
                {isPending ? (
                  <span className="flex gap-2">
                    <Spinner /> pending...
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
