import { Migrations } from '@convex-dev/migrations'
import { components } from './_generated/api'
import { DataModel } from './_generated/dataModel'
// import { Id } from './_generated/dataModel'

export const migrations = new Migrations<DataModel>(components.migrations)

// export const backfillEntryUserId = migrations.define({
//   table: 'entries',
//   migrateOne: async (ctx, entry) => {
//     if (entry.userId === undefined) {
//       const journal = await ctx.db.get(entry.journalId as Id<'journals'>)
//       if (journal) {
//         await ctx.db.patch(entry._id, { userId: journal.userId })
//       }
//     }
//   },
// })

// export const removeEntriesCount = migrations.define({
//   table: 'journals',
//   migrateOne: async (ctx, journal) => {
//     if ('entriesCount' in journal) {
//       await ctx.db.patch(journal._id, { entriesCount: undefined })
//     }
//   },
// })

// export const addSuggestionsEnabled = migrations.define({
//   table: 'journals',
//   migrateOne: async (ctx, journal) => {
//     if (journal.suggestionsEnabled === undefined) {
//       await ctx.db.patch(journal._id, { suggestionsEnabled: true })
//     }
//   },
// })

// export const addBookmarkedFalse = migrations.define({
//   table: 'entries',
//   migrateOne: async (ctx, entry) => {
//     if (entry.bookmarked === undefined) {
//       await ctx.db.patch(entry._id, { bookmarked: false })
//     }
//   },
// })

// to run migrations, from CLI: npx convex run migrations:runIt '{fn: "migrations:addBookmarkedFalse"}'

export const runIt = migrations.runner()
