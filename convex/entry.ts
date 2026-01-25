import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getAuthenticatedUser, getCurrentUserEntry, getCurrentUserJournal } from './_utils'

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    content: v.string(),
    journalId: v.id('journals'),
  },
  handler: async (ctx, { title, content, journalId }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const journal = await getCurrentUserJournal({
      ctx,
      currentUser,
      id: journalId,
    })

    await ctx.db.insert('entries', {
      title: title ?? '',
      content: content,
      journalId: journalId,
      userId: currentUser._id,
      bookmarked: false,
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

export const update = mutation({
  args: {
    entryId: v.id('entries'),
    title: v.optional(v.string()),
    content: v.string(),
  },
  handler: async (ctx, { entryId, title, content }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const entry = await getCurrentUserEntry({ ctx, currentUser, id: entryId })

    const journal = await getCurrentUserJournal({
      ctx,
      currentUser,
      id: entry.journalId,
    })

    await ctx.db.patch(entry._id, {
      title: title ?? entry.title,
      content: content,
      updatedAt: Date.now(),
    })

    await ctx.db.patch(journal._id, {
      updatedAt: Date.now(),
    })
  },
})

export const toggleBookmark = mutation({
  args: {
    entryId: v.id('entries'),
  },
  handler: async (ctx, { entryId }) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const entry = await getCurrentUserEntry({ ctx, currentUser, id: entryId })

    await ctx.db.patch(entry._id, {
      bookmarked: !entry.bookmarked,
      updatedAt: Date.now(),
    })
  },
})

export const getBookmarkedByJournal = query({
  args: {
    journalId: v.id('journals'),
  },
  handler: async (ctx, { journalId }) => {
    const user = await getAuthenticatedUser(ctx)

    return ctx.db
      .query('entries')
      .withIndex('by_user_journal_bookmarked', (q) =>
        q.eq('userId', user._id).eq('journalId', journalId).eq('bookmarked', true),
      )
      .collect()
  },
})

export const getEntryById = query({
  args: {
    entryId: v.id('entries'),
  },
  handler: async (ctx, { entryId }) => {
    const user = await getAuthenticatedUser(ctx)

    const entry = await ctx.db.get(entryId)

    if (!entry || entry.userId !== user._id) {
      return null
    }

    return entry
  },
})
