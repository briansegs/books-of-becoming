import { v } from 'convex/values'
import { query } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const get = query({
  args: {
    id: v.id('journals'),
  },
  handler: async (ctx, { id }) => {
    await getAuthenticatedUser(ctx)

    const entries = await ctx.db
      .query('entries')
      .withIndex('by_journalId', (q) => q.eq('journalId', id))
      .collect()

    return entries
  },
})
