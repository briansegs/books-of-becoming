import { v } from 'convex/values'
import { mutation } from './_generated/server'
import { getAuthenticatedUser, getCurrntUserJournal } from './_utils'

export const createJournal = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journal = await ctx.db.insert('journals', {
      userId: currentUser._id,
      ...args,
    })

    return journal
  },
})

export const deleteJournal = mutation({
  args: { id: v.id('journals') },
  handler: async (ctx, { id }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journal = await getCurrntUserJournal({ ctx, currentUser, id })

    await ctx.db.delete(journal._id)
  },
})

export const updateJournal = mutation({
  args: {
    id: v.id('journals'),
    data: v.object({
      title: v.string(),
    }),
  },
  handler: async (ctx, { id, data }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journal = await getCurrntUserJournal({ ctx, currentUser, id })

    await ctx.db.patch(journal._id, data)
  },
})
