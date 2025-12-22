'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/features/shared/components/ui/popover'
import { Switch } from '@/features/shared/components/ui/switch'
import { Separator } from '@/features/shared/components/ui/separator'
import { Button } from '@/features/shared/components/ui/button'
import { Settings } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/features/shared/components/ui/form'
import { Spinner } from '@/features/shared/components/ui/spinner'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { parseActionError } from '@/utilities/parseActionError'
import { updateJournalSettings } from '@/app/actions/journalActions'
import { useState } from 'react'
import { JournalSettingsMenuProps } from '../types'
import { updateJournalSettingsSchema } from '@/app/actions/schemas'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'

type updateJournalSettingsFormData = z.infer<typeof updateJournalSettingsSchema>

export function JournalSettingsMenu({
  journal,
  showSuggestions,
  setShowSuggestions,
}: JournalSettingsMenuProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<updateJournalSettingsFormData>({
    resolver: zodResolver(updateJournalSettingsSchema),
    defaultValues: {
      id: journal._id,
      suggestionsEnabled: journal.suggestionsEnabled,
    },
  })

  const { execute, isPending } = useAction(updateJournalSettings, {
    onSuccess: ({ input }) => {
      setOpen(false)

      if (showSuggestions !== input.suggestionsEnabled) {
        setShowSuggestions(input.suggestionsEnabled)
      }

      form.reset({
        id: input.id,
        suggestionsEnabled: input.suggestionsEnabled,
      })

      toast.success('Settings updated!')
    },
    onError: (actionError) => {
      toast.error(parseActionError(actionError.error))
    },
  })

  function handleSubmit(values: z.infer<typeof updateJournalSettingsSchema>) {
    if (values.suggestionsEnabled === journal.suggestionsEnabled) {
      toast.info('No changes made to settings')
      setOpen(false)
      return
    }

    execute(values)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button size="icon" aria-label="Open settings">
              <Settings />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Journal Settings</p>
        </TooltipContent>
      </Tooltip>

      <PopoverContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Journal Settings</h3>
          <Separator />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="suggestionsEnabled"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="suggestionsEnabled">Show Suggestions</FormLabel>
                    <FormControl>
                      <Switch
                        id="suggestionsEnabled"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button className="w-32" disabled={isPending} type="submit">
                {isPending ? (
                  <span className="flex gap-2">
                    <Spinner /> Saving...
                  </span>
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
