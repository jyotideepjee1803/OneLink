import * as z from "zod"
import { CompletePage, relatedPageSchema } from "./index"

export const pageButtonSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  pageId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePageButton extends z.infer<typeof pageButtonSchema> {
  page: CompletePage
}

/**
 * relatedPageButtonSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPageButtonSchema: z.ZodSchema<CompletePageButton> = z.lazy(() => pageButtonSchema.extend({
  page: relatedPageSchema,
}))
