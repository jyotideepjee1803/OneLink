import { db } from "@/lib/db/index";
import { 
  PageLinkId, 
  NewPageLinkParams,
  UpdatePageLinkParams, 
  updatePageLinkSchema,
  insertPageLinkSchema, 
  pageLinkIdSchema 
} from "@/lib/db/schema/pageLinks";

export const createPageLink = async (pageLink: NewPageLinkParams) => {
  const newPageLink = insertPageLinkSchema.parse(pageLink);
  try {
    const p = await db.pageLink.create({ data: newPageLink });
    return { pageLink: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePageLink = async (id: PageLinkId, pageLink: UpdatePageLinkParams) => {
  const { id: pageLinkId } = pageLinkIdSchema.parse({ id });
  const newPageLink = updatePageLinkSchema.parse(pageLink);
  try {
    const p = await db.pageLink.update({ where: { id: pageLinkId }, data: newPageLink})
    return { pageLink: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePageLink = async (id: PageLinkId) => {
  const { id: pageLinkId } = pageLinkIdSchema.parse({ id });
  try {
    const p = await db.pageLink.delete({ where: { id: pageLinkId }})
    return { pageLink: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

