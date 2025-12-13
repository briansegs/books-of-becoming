'use server'

import { revalidatePath } from 'next/cache'

import { fetchMutation } from 'convex/nextjs'
import { api } from 'convex/_generated/api'
import { actionClient } from '@/lib/safe-action'
import { createEntrySchema, deleteEntrySchema, updateEntrySchema } from './schemas'
import { Id } from 'convex/_generated/dataModel'
import { getUserToken } from './utils'

export const createEntry = actionClient
  .inputSchema(createEntrySchema)
  .action(async ({ parsedInput: { title, content, journalId } }) => {
    const token = await getUserToken()

    await fetchMutation(
      api.entry.create,
      {
        title,
        content,
        journalId: journalId as Id<'journals'>,
      },
      { token },
    )

    revalidatePath(`/journal/${journalId}`)
  })

export const deleteEntry = actionClient
  .inputSchema(deleteEntrySchema)
  .action(async ({ parsedInput: { entryId, journalId } }) => {
    const token = await getUserToken()

    await fetchMutation(api.entry.remove, { entryId: entryId as Id<'entries'> }, { token })

    revalidatePath(`/journal/${journalId}`)
  })

export const updateEntry = actionClient
  .inputSchema(updateEntrySchema)
  .action(async ({ parsedInput: { entryId, title, content, journalId } }) => {
    const token = await getUserToken()

    await fetchMutation(
      api.entry.update,
      {
        title,
        content,
        entryId: entryId as Id<'entries'>,
      },
      { token },
    )

    revalidatePath(`/journal/${journalId}`)
  })
