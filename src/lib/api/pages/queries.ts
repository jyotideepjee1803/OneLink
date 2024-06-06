import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type PageId, pageIdSchema } from "@/lib/db/schema/pages";

export const getPages = async () => {
  const { session } = await getUserAuth();
  const p = await db.page.findMany({ where: { userId: session?.user.id! } });
  return { pages: p };
};

export const getPageById = async (id: PageId) => {
  const { session } = await getUserAuth();
  const { id: pageId } = pageIdSchema.parse({ id });
  const p = await db.page.findFirst({
    where: { id: pageId, userId: session?.user.id! },
  });
  return { page: p };
};

export const getPageByIdWithPageLinks = async (id: PageId) => {
  const { session } = await getUserAuth();
  const { id: pageId } = pageIdSchema.parse({ id });
  const p = await db.page.findFirst({
    where: { id: pageId, userId: session?.user.id! },
    include: { pageLinks: { include: { page: true } }, pageButtons : {include : {page: true}} },
  });
  if (p === null) return { page: null };
  const { pageLinks, pageButtons, ...page } = p;

  return { page, pageLinks: pageLinks, pageButtons: pageButtons };
};

export const getPageBySlugWithPageLinksButtons = async (slug: PageId) => {
  const { id: pageId } = pageIdSchema.parse({ id: slug });
  const p = await db.page.findFirst({
    where: { slug: pageId },
    include: { pageLinks: { include: { page: true } }, pageButtons : {include: {page:true}} },
  });
  if (p === null) return { page: null };
  const { pageButtons, pageLinks, ...page} = p;

  return { page, pageLinks: pageLinks, pageButtons };
};
