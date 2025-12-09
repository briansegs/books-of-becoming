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

    const allEntries = await ctx.db
      .query('entries')
      .withIndex('by_userId', (q) => q.eq('userId', currentUser._id))
      .collect()

    // Group entries by journalId
    const entryCounts = allEntries.reduce(
      (acc, entry) => {
        acc[entry.journalId] = (acc[entry.journalId] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return journals.map((journal) => ({
      ...journal,
      entriesCount: entryCounts[journal._id] || 0,
    }))
  },
})
