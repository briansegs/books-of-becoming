import { ConvexError } from 'convex/values'
import { MutationCtx, QueryCtx } from './_generated/server'
import { Doc, Id } from './_generated/dataModel'

type Ctx = {
  ctx: QueryCtx | MutationCtx
}

type getUserByClerkIdProps = Ctx & {
  clerkId: string
}

export async function getUserByClerkId({ ctx, clerkId }: getUserByClerkIdProps) {
  const user = await ctx.db
    .query('users')
    .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
    .unique()

  if (!user) {
    throw new ConvexError(`User not found with ClerkId: ${clerkId}`)
  }

  return user
}

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity()

  if (!identity) {
    throw new ConvexError('Unauthorized')
  }

  const currentUser = await getUserByClerkId({
    ctx,
    clerkId: identity.subject,
  })

  return currentUser
}

type getCurrntUserJournalProps = Ctx & {
  currentUser: Doc<'users'>
  id: Id<'journals'>
}

export async function getCurrntUserJournal({ ctx, currentUser, id }: getCurrntUserJournalProps) {
  const journal = await ctx.db.get(id)

  if (!journal) throw new ConvexError('Journal could not be found')

  if (journal.userId !== currentUser._id) {
    throw new ConvexError('User not authorized to delete this journal')
  }

  return journal
}
