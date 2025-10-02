import { query } from './_generated/server'
import { getAuthenticatedUser } from './_utils'

export const get = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journals = await ctx.db
      .query('journals')
      .withIndex('by_userId', (q) => q.eq('userId', currentUser._id))
      .collect()

    return journals
  },
})
