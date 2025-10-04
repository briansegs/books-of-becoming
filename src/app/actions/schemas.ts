import { z } from 'zod'

export const createJournalFormSchema = z.object({
  title: z.string().trim().min(1, { message: "This field can't be empty" }),
})
