import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  })
    .index('by_email', ['email'])
    .index('by_clerkId', ['clerkId']),

  journals: defineTable({
    title: v.string(),
    userId: v.id('users'),
    type: v.string(),
    updatedAt: v.number(),
    color: v.string(),
    textColor: v.string(),
    background: v.string(),
  }).index('by_userId', ['userId']),
})
