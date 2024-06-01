import { db } from "@/lib/db/index";
import { type PageLinkId, pageLinkIdSchema } from "@/lib/db/schema/pageLinks";

export const getPageLinks = async () => {
  const p = await db.pageLink.findMany({include: { page: true}});
  return { pageLinks: p };
};

export const getPageLinkById = async (id: PageLinkId) => {
  const { id: pageLinkId } = pageLinkIdSchema.parse({ id });
  const p = await db.pageLink.findFirst({
    where: { id: pageLinkId},
    include: { page: true }
  });
  return { pageLink: p };
};


