'use server'

import { revalidatePath } from 'next/cache'

import { fetchMutation } from 'convex/nextjs'
import { api } from 'convex/_generated/api'
import { auth } from '@clerk/nextjs/server'
import { actionClient } from '@/lib/safe-action'
import {
  createJournalFormSchema,
  deleteJournalSchema,
  editJournalFormSchema,
  updateJournalSettingsSchema,
} from './schemas'
import { Id } from 'convex/_generated/dataModel'

export const createJournal = actionClient
  .inputSchema(createJournalFormSchema)
  .action(
    async ({ parsedInput: { title, type, color, background, textColor, suggestionsEnabled } }) => {
      const { userId, getToken } = await auth()
      if (!userId) throw new Error('No userId found')

      const token = await getToken({ template: 'convex' })

      if (!token) throw new Error('No user token found')

      await fetchMutation(
        api.journal.create,
        {
          title,
          type,
          color,
          textColor,
          background,
          suggestionsEnabled,
        },
        { token },
      )

      revalidatePath(`/journals/${userId}`)
    },
  )

export const deleteJournal = actionClient
  .inputSchema(deleteJournalSchema)
  .action(async ({ parsedInput: { journalId } }) => {
    const { userId, getToken } = await auth()
    if (!userId) throw new Error('No userId found')

    const token = await getToken({ template: 'convex' })

    if (!token) throw new Error('No user token found')

    await fetchMutation(api.journal.remove, { id: journalId as Id<'journals'> }, { token })

    revalidatePath(`/journals/${userId}`)
  })

export const editJournal = actionClient
  .inputSchema(editJournalFormSchema)
  .action(
    async ({
      parsedInput: { id, title, type, color, background, textColor, suggestionsEnabled },
    }) => {
      const { userId, getToken } = await auth()
      if (!userId) throw new Error('No userId found')

      const token = await getToken({ template: 'convex' })

      if (!token) throw new Error('No user token found')

      await fetchMutation(
        api.journal.update,
        {
          id: id as Id<'journals'>,
          data: {
            title,
            type,
            color,
            textColor,
            background,
            suggestionsEnabled,
          },
        },
        { token },
      )

      revalidatePath(`/journals/${userId}`)
    },
  )

export const updateJournalSettings = actionClient
  .inputSchema(updateJournalSettingsSchema)
  .action(async ({ parsedInput: { id, suggestionsEnabled } }) => {
    const { userId, getToken } = await auth()
    if (!userId) throw new Error('No userId found')

    const token = await getToken({ template: 'convex' })

    if (!token) throw new Error('No user token found')

    await fetchMutation(
      api.journal.updateJournalSettings,
      {
        id: id as Id<'journals'>,

        suggestionsEnabled,
      },
      { token },
    )

    revalidatePath(`/journal/${id}`)
  })
