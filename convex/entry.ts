import { v } from 'convex/values'
import { mutation } from './_generated/server'
import { getAuthenticatedUser, getCurrentUserJournal } from './_utils'

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
