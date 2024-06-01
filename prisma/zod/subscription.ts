import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const subscriptionSchema = z.object({
  userId: z.string(),
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string().nullish(),
  stripePriceId: z.string().nullish(),
  stripeCurrentPeriodEnd: z.date().nullish(),
})

export interface CompleteSubscription extends z.infer<typeof subscriptionSchema> {
  user: CompleteUser
}

/**
 * relatedSubscriptionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSubscriptionSchema: z.ZodSchema<CompleteSubscription> = z.lazy(() => subscriptionSchema.extend({
  user: relatedUserSchema,
}))
