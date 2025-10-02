import { ConvexError } from 'convex/values'
import { MutationCtx, QueryCtx } from './_generated/server'

type getUserByClerkIdProps = {
  ctx: QueryCtx | MutationCtx
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
