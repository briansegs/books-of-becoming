import { z } from 'zod'

export const JOURNAL_TITLE_MAX = 50

export const createJournalFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "This field can't be empty" })
    .max(JOURNAL_TITLE_MAX, {
      message: `Journal title must be ${JOURNAL_TITLE_MAX} characters or fewer`,
    }),
  type: z.enum(['default', 'future']),
  color: z.enum(['red', 'blue', 'green', 'pink', 'yellow', 'slate', 'black', 'white']),
  textColor: z.enum(['gold', 'silver', 'black', 'white']),
  background: z.enum([
    'none',
    'wovenFabric',
    'diagonalGrid',
    'crosshatchArt',
    'zigzagLightning',
    'circuitBoard',
    'paperTexture',
  ]),
  suggestionsEnabled: z.boolean(),
})

export const deleteJournalSchema = z.object({
  journalId: z.string(),
})

export const editJournalFormSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .trim()
    .min(1, { message: "This field can't be empty" })
    .max(JOURNAL_TITLE_MAX, {
      message: `Journal title must be ${JOURNAL_TITLE_MAX} characters or fewer`,
    }),
  type: z.enum(['default', 'future']),
  color: z.enum(['red', 'blue', 'green', 'pink', 'yellow', 'slate', 'black', 'white']),
  textColor: z.enum(['gold', 'silver', 'black', 'white']),
  background: z.enum([
    'none',
    'wovenFabric',
    'diagonalGrid',
    'crosshatchArt',
    'zigzagLightning',
    'circuitBoard',
    'paperTexture',
  ]),
  suggestionsEnabled: z.boolean(),
})

export const updateJournalSettingsSchema = z.object({
  id: z.string(),
  suggestionsEnabled: z.boolean(),
})

export const createEntrySchema = z.object({
  title: z.optional(z.string()),
  content: z
    .string()
    .trim()
    .min(1, { message: "Entry body can't be empty" })
    .refine((html) => html.replace(/<[^>]*>/g, '').trim().length > 0, {
      message: "Entry body can't be empty",
    }),
  journalId: z.string(),
})

export const deleteEntrySchema = z.object({
  entryId: z.string(),
  journalId: z.string(),
})

export const updateEntrySchema = z.object({
  entryId: z.string(),
  title: z.string().trim().min(1, { message: "Entry title can't be empty" }),
  content: z
    .string()
    .trim()
    .min(1, { message: "Entry body can't be empty" })
    .refine((html) => html.replace(/<[^>]*>/g, '').trim().length > 0, {
      message: "Entry body can't be empty",
    }),
  journalId: z.string(),
})
