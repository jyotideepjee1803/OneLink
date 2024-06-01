import * as z from "zod"
import { CompletePage, relatedPageSchema } from "./index"

export const pageLinkSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  pageId: z.string(),
  icon: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePageLink extends z.infer<typeof pageLinkSchema> {
  page: CompletePage
}

/**
 * relatedPageLinkSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPageLinkSchema: z.ZodSchema<CompletePageLink> = z.lazy(() => pageLinkSchema.extend({
  page: relatedPageSchema,
}))
