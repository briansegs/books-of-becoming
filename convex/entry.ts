import { v } from 'convex/values'
import { mutation } from './_generated/server'
import { getAuthenticatedUser, getCurrentUserEntry, getCurrentUserJournal } from './_utils'

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    content: v.string(),
    journalId: v.id('journals'),
  },
  handler: async (ctx, { title, content, journalId }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    await ctx.db.insert('entries', {
      title: title || '',
      content: content,
      journalId: journalId,
      userId: currentUser._id,
    })

    const journal = await getCurrentUserJournal({
      ctx,
      currentUser,
      id: journalId,
    })

    await ctx.db.patch(journal._id, {
      updatedAt: Date.now(),
    })
  },
})

export const remove = mutation({
  args: {
    entryId: v.id('entries'),
  },
  handler: async (ctx, { entryId }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const entry = await getCurrentUserEntry({ ctx, currentUser, id: entryId })

    await ctx.db.delete(entry._id)

    const journal = await getCurrentUserJournal({
      ctx,
      currentUser,
      id: entry.journalId,
    })

    await ctx.db.patch(journal._id, {
      updatedAt: Date.now(),
    })
  },
})
