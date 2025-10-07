import { v } from 'convex/values'
import { mutation } from './_generated/server'
import { getAuthenticatedUser, getCurrentUserJournal } from './_utils'

export const create = mutation({
  args: {
    title: v.string(),
    updatedAt: v.number(),
    type: v.string(),
    color: v.string(),
    textColor: v.string(),
    background: v.string(),
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
    }),
  },
  handler: async (ctx, { id, data }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journal = await getCurrentUserJournal({ ctx, currentUser, id })

    await ctx.db.patch(journal._id, data)
  },
})
