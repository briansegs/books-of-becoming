import { z } from 'zod'

export const createJournalFormSchema = z.object({
  title: z.string().min(1, { message: "This field can't be empty" }),
})
