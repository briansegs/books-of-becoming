import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import {
  journalBackgrounds,
  journalColors,
  journalTextColors,
  journalType,
} from './lib/journalSchema'

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
    type: journalType,
    updatedAt: v.number(),
    color: journalColors,
    textColor: journalTextColors,
    background: journalBackgrounds,
    entriesCount: v.number(),
  }).index('by_userId', ['userId']),
})
