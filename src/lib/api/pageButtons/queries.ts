import { db } from "@/lib/db/index";
import { type PageButtonId, pageButtonIdSchema } from "@/lib/db/schema/pageButtons";

export const getPageButtons = async () => {
  const p = await db.pageButton.findMany({include: { page: true}});
  return { pageButtons: p };
};

export const getPageButtonById = async (id: PageButtonId) => {
  const { id: pageButtonId } = pageButtonIdSchema.parse({ id });
  const p = await db.pageButton.findFirst({
    where: { id: pageButtonId},
    include: { page: true }
  });
  return { pageLink: p };
};


