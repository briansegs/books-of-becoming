'use server'

import { revalidatePath } from 'next/cache'

import { fetchMutation } from 'convex/nextjs'
import { api } from 'convex/_generated/api'
import { auth } from '@clerk/nextjs/server'
import { actionClient } from '@/lib/safe-action'
import { createEntrySchema, deleteEntrySchema } from './schemas'
import { Id } from 'convex/_generated/dataModel'

export const createEntry = actionClient
  .inputSchema(createEntrySchema)
  .action(async ({ parsedInput: { title, content, journalId } }) => {
    const { userId, getToken } = await auth()
    if (!userId) throw new Error('No userId found')

    const token = await getToken({ template: 'convex' })

    if (!token) throw new Error('No user token found')

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
    const { userId, getToken } = await auth()
    if (!userId) throw new Error('No userId found')

    const token = await getToken({ template: 'convex' })

    if (!token) throw new Error('No user token found')

    await fetchMutation(api.entry.remove, { entryId: entryId as Id<'entries'> }, { token })

    revalidatePath(`/journal/${journalId}`)
  })
