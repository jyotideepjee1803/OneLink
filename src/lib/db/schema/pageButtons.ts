import { pageButtonSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getPageButtons } from "@/lib/api/pageButtons/queries";


// Schema for pageLinks - used to validate API requests
const baseSchema = pageButtonSchema.omit(timestamps)

export const insertPageButtonSchema = baseSchema.omit({ id: true });
export const insertPageButtonParams = baseSchema.extend({
  pageId: z.coerce.string().min(1),
  url : z.coerce.string().min(1,{message: "URL is required"}).url({message : "Invalid url"})
}).omit({ 
  id: true
});

export const updatePageButtonSchema = baseSchema;
export const updatePageButtonParams = updatePageButtonSchema.extend({
  pageId: z.coerce.string().min(1),
  url : z.coerce.string().min(1,{message: "URL is required"}).url({message : "Invalid url"})
})
export const pageButtonIdSchema = baseSchema.pick({ id: true });

// Types for pageLinks - used to type API request params and within Components
export type PageButton = z.infer<typeof pageButtonSchema>;
export type NewPageButton = z.infer<typeof insertPageButtonSchema>;
export type NewPageButtonParams = z.infer<typeof insertPageButtonParams>;
export type UpdatePageButtonParams = z.infer<typeof updatePageButtonParams>;
export type PageButtonId = z.infer<typeof pageButtonIdSchema>["id"];
    
// this type infers the return from getPageLinks() - meaning it will include any joins
export type CompletePageButton = Awaited<ReturnType<typeof getPageButtons>>["pageButtons"][number];

