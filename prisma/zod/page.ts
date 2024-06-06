import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompletePageLink, relatedPageLinkSchema, CompletePageButton, relatedPageButtonSchema } from "./index"

export const pageSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  public: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  icon: z.string().nullish(),
  bgColor: z.string(),
})

export interface CompletePage extends z.infer<typeof pageSchema> {
  user: CompleteUser
  pageLinks: CompletePageLink[]
  pageButtons: CompletePageButton[]
}

/**
 * relatedPageSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPageSchema: z.ZodSchema<CompletePage> = z.lazy(() => pageSchema.extend({
  user: relatedUserSchema,
  pageLinks: relatedPageLinkSchema.array(),
  pageButtons: relatedPageButtonSchema.array(),
}))
