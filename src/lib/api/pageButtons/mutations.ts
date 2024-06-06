import { db } from "@/lib/db/index";
import { PageButtonId, NewPageButtonParams, UpdatePageButtonParams, insertPageButtonSchema, updatePageButtonSchema, pageButtonIdSchema } from "@/lib/db/schema/pageButtons";

export const createPageButton = async (pageButton: NewPageButtonParams) => {
  const newPageButton = insertPageButtonSchema.parse(pageButton);
  try {
    const p = await db.pageButton.create({ data: newPageButton });
    return { pageButton: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePageButton = async (id: PageButtonId, pageButton: UpdatePageButtonParams) => {
  const { id: pageLinkId } = pageButtonIdSchema.parse({ id });
  const newPageButton = updatePageButtonSchema.parse(pageButton);
  try {
    const p = await db.pageButton.update({ where: { id: pageLinkId }, data: newPageButton})
    return { pageButton: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePageButton = async (id: PageButtonId) => {
  const { id: pageButtonId } = pageButtonIdSchema.parse({ id });
  try {
    const p = await db.pageButton.delete({ where: { id: pageButtonId }})
    return { pageButton: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

