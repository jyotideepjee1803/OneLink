import * as z from "zod"
import { CompleteSubscription, relatedSubscriptionSchema, CompletePage, relatedPageSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  clerkId: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  subscription?: CompleteSubscription | null
  pages: CompletePage[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  subscription: relatedSubscriptionSchema.nullish(),
  pages: relatedPageSchema.array(),
}))
