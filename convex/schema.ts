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
  }).index('by_userId', ['userId']),

  entries: defineTable({
    title: v.string(),
    content: v.string(),
    journalId: v.id('journals'),
    userId: v.id('users'),
    updatedAt: v.optional(v.number()),
  })
    .index('by_journalId', ['journalId'])
    .index('by_userId', ['userId']),
})
