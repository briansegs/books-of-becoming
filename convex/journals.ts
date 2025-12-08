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

export const getJournalsWithEntriesCount = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journals = await ctx.db
      .query('journals')
      .withIndex('by_userId', (q) => q.eq('userId', currentUser._id))
      .collect()

    const journalsWithEntriesCount = await Promise.all(
      journals.map(async (journal) => {
        const entries = await ctx.db
          .query('entries')
          .withIndex('by_journalId', (q) => q.eq('journalId', journal._id))
          .collect()

        return {
          ...journal,
          entriesCount: entries.length,
        }
      }),
    )

    return journalsWithEntriesCount
  },
})
