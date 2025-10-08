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
