import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getAuthenticatedUser, getCurrentUserJournal } from './_utils'
import {
  journalBackgrounds,
  journalColors,
  journalTextColors,
  journalType,
} from './lib/journalSchema'

export const create = mutation({
  args: {
    title: v.string(),
    type: journalType,
    color: journalColors,
    textColor: journalTextColors,
    background: journalBackgrounds,
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journal = await ctx.db.insert('journals', {
      userId: currentUser._id,
      updatedAt: Date.now(),
      entriesCount: 0,
      ...args,
    })

    return journal
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
