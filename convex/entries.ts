import { v } from 'convex/values'
import { query } from './_generated/server'
import { getAuthenticatedUser, getCurrentUserJournal } from './_utils'

export const get = query({
  args: {
    id: v.id('journals'),
  },
  handler: async (ctx, { id }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journal = await getCurrentUserJournal({ ctx, currentUser, id })

    const entries = await ctx.db
      .query('entries')
      .withIndex('by_journalId', (q) => q.eq('journalId', journal._id))
      .collect()

    return entries
  },
})
