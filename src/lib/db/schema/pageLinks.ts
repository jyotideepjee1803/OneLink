import { pageLinkSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getPageLinks } from "@/lib/api/pageLinks/queries";


// Schema for pageLinks - used to validate API requests
const baseSchema = pageLinkSchema.omit(timestamps)

export const insertPageLinkSchema = baseSchema.omit({ id: true });
export const insertPageLinkParams = baseSchema.extend({
  pageId: z.coerce.string().min(1),
  title: z.coerce.string().min(1,{message: "Title is required"}),
  url : z.coerce.string().min(1,{message: "URL is required"}).url({message : "Invalid url"})
}).omit({ 
  id: true
});

export const updatePageLinkSchema = baseSchema;
export const updatePageLinkParams = updatePageLinkSchema.extend({
  pageId: z.coerce.string().min(1),
  title: z.coerce.string().min(1,{message: "Title is required"}),
  url : z.coerce.string().min(1,{message: "URL is required"}).url({message : "Invalid url"})
})
export const pageLinkIdSchema = baseSchema.pick({ id: true });

// Types for pageLinks - used to type API request params and within Components
export type PageLink = z.infer<typeof pageLinkSchema>;
export type NewPageLink = z.infer<typeof insertPageLinkSchema>;
export type NewPageLinkParams = z.infer<typeof insertPageLinkParams>;
export type UpdatePageLinkParams = z.infer<typeof updatePageLinkParams>;
export type PageLinkId = z.infer<typeof pageLinkIdSchema>["id"];
    
// this type infers the return from getPageLinks() - meaning it will include any joins
export type CompletePageLink = Awaited<ReturnType<typeof getPageLinks>>["pageLinks"][number];

