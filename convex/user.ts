import { ConvexError, v } from 'convex/values'
import { internalMutation, internalQuery, mutation, query } from './_generated/server'
import { getAuthenticatedUser, getUserByClerkId } from './_utils'

export const createUser = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique()

    if (existing) {
      throw new ConvexError(`User already exists with ClerkId: ${args.clerkId}`)
    }

    await ctx.db.insert('users', args)
  },
})

export const getUserInternal = internalQuery({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return await getUserByClerkId({ ctx, clerkId })
  },
})

export const deleteUserInternal = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, { clerkId }) => {
    const user = await getUserByClerkId({ ctx, clerkId })

    const journals = await ctx.db
      .query('journals')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()

    const entriesByJournal = await Promise.all(
      journals.map((journal) =>
        ctx.db
          .query('entries')
          .withIndex('by_journalId', (q) => q.eq('journalId', journal._id))
          .collect(),
      ),
    )

    const entries = entriesByJournal.flat()

    await Promise.all(entries.map((entry) => ctx.db.delete(entry._id)))
    await Promise.all(journals.map((journal) => ctx.db.delete(journal._id)))
    await ctx.db.delete(user._id)
  },
})

export const deleteUser = mutation({
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx)

    const journals = await ctx.db
      .query('journals')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()

    const entriesByJournal = await Promise.all(
      journals.map((journal) =>
        ctx.db
          .query('entries')
          .withIndex('by_journalId', (q) => q.eq('journalId', journal._id))
          .collect(),
      ),
    )

    const entries = entriesByJournal.flat()

    await Promise.all(entries.map((entry) => ctx.db.delete(entry._id)))
    await Promise.all(journals.map((journal) => ctx.db.delete(journal._id)))
    await ctx.db.delete(user._id)
  },
})

export const updateUserInternal = internalMutation({
  args: {
    clerkId: v.string(),
    data: v.object({
      username: v.optional(v.string()),
      email: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { clerkId, data }) => {
    const user = await getUserByClerkId({ ctx, clerkId })

    await ctx.db.patch(user._id, data)
  },
})

export const updateUser = mutation({
  args: {
    data: v.object({
      username: v.optional(v.string()),
      email: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { data }) => {
    const user = await getAuthenticatedUser(ctx)

    await ctx.db.patch(user._id, data)
  },
})

export const getUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return await getUserByClerkId({ ctx, clerkId })
  },
})
