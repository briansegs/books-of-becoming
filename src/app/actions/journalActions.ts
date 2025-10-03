'use server'

import { revalidatePath } from 'next/cache'

import { fetchMutation } from 'convex/nextjs'
import { api } from 'convex/_generated/api'
import { auth } from '@clerk/nextjs/server'
import { actionClient } from '@/lib/safe-action'
import { createJournalFormSchema } from './schemas'

export const createJournal = actionClient
  .inputSchema(createJournalFormSchema)
  .action(async ({ parsedInput: { title } }) => {
    const { userId, getToken } = await auth()
    const token = await getToken({ template: 'convex' })

    if (!token) throw new Error('No user token found')

    await fetchMutation(api.journal.create, { title }, { token })

    revalidatePath(`/journals/${userId}`)
  })
