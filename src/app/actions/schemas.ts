import { z } from 'zod'

export const createJournalFormSchema = z.object({
  title: z.string().trim().min(1, { message: "This field can't be empty" }),
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
})

export const deleteJournalSchema = z.object({
  journalId: z.string(),
})

export const editJournalFormSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, { message: "This field can't be empty" }),
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
})

export const createEntrySchema = z.object({
  title: z.optional(z.string()),
  content: z.string().trim().min(1, { message: "This field can't be empty" }),
  journalId: z.string(),
})

export const deleteEntrySchema = z.object({
  entryId: z.string(),
  journalId: z.string(),
})
