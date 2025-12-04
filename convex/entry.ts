import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getAuthenticatedUser, getCurrentUserJournal } from './_utils'
import {
  journalType,
  journalColors,
  journalTextColors,
  journalBackgrounds,
} from './lib/journalSchema'

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    content: v.string(),
    journalId: v.id('journals'),
  },
  handler: async (ctx, { title, content, journalId }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const entry = await ctx.db.insert('entries', {
      title: title || '',
      content: content,
      journalId: journalId,
    })

    if (entry) {
      const journal = await getCurrentUserJournal({ ctx, currentUser, id: journalId })

      await ctx.db.patch(journal._id, {
        updatedAt: Date.now(),
        entriesCount: (journal.entriesCount ?? 0) + 1,
      })
    }
  },
})

export const remove = mutation({
  args: { id: v.id('journals') },
  handler: async (ctx, { id }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journal = await getCurrentUserJournal({ ctx, currentUser, id })

    await ctx.db.delete(journal._id)
  },
})

export const update = mutation({
  args: {
    id: v.id('journals'),
    data: v.object({
      title: v.string(),
      type: journalType,
      color: journalColors,
      textColor: journalTextColors,
      background: journalBackgrounds,
    }),
  },
  handler: async (ctx, { id, data }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journal = await getCurrentUserJournal({ ctx, currentUser, id })

    await ctx.db.patch(journal._id, {
      updatedAt: Date.now(),
      ...data,
    })
  },
})

export const get = query({
  args: {
    id: v.id('journals'),
  },
  handler: async (ctx, { id }) => {
    await getAuthenticatedUser(ctx)

    const journal = await ctx.db.get(id)

    return journal
  },
})
