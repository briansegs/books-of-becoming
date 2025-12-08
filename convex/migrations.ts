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

// to run migrations, from CLI: npx convex run migrations:runIt '{fn: "migrations:backfillEntryUserId"}'

export const runIt = migrations.runner()
