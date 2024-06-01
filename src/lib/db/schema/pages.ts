import { pageSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getPages } from "@/lib/api/pages/queries";


// Schema for pages - used to validate API requests
const baseSchema = pageSchema.omit(timestamps)

export const insertPageSchema = baseSchema.omit({ id: true });
export const insertPageParams = baseSchema.extend({
  public: z.coerce.boolean()
}).omit({ 
  id: true,
  userId: true
});

export const updatePageSchema = baseSchema;
export const updatePageParams = updatePageSchema.extend({
  public: z.coerce.boolean()
}).omit({ 
  userId: true
});
export const pageIdSchema = baseSchema.pick({ id: true });

// Types for pages - used to type API request params and within Components
export type Page = z.infer<typeof pageSchema>;
export type NewPage = z.infer<typeof insertPageSchema>;
export type NewPageParams = z.infer<typeof insertPageParams>;
export type UpdatePageParams = z.infer<typeof updatePageParams>;
export type PageId = z.infer<typeof pageIdSchema>["id"];
    
// this type infers the return from getPages() - meaning it will include any joins
export type CompletePage = Awaited<ReturnType<typeof getPages>>["pages"][number];

