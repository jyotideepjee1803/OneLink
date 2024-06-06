"use server";

import { revalidatePath } from "next/cache";
import { createPageButton, deletePageButton, updatePageButton } from "../api/pageButtons/mutations";
import { PageButtonId, NewPageButtonParams, UpdatePageButtonParams, pageButtonIdSchema, insertPageButtonParams, updatePageButtonParams } from "../db/schema/pageButtons";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePageLinks = () => revalidatePath("/page-links");

export const createPageButtonAction = async (input: NewPageButtonParams) => {
  try {
    const payload = insertPageButtonParams.parse(input);
    await createPageButton(payload);
    revalidatePageLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePageButtonAction = async (input: UpdatePageButtonParams) => {
  try {
    const payload = updatePageButtonParams.parse(input);
    await updatePageButton(payload.id, payload);
    revalidatePageLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePageButtonAction = async (input: PageButtonId) => {
  try {
    const payload = pageButtonIdSchema.parse({ id: input });
    await deletePageButton(payload.id);
    revalidatePageLinks();
  } catch (e) {
    return handleErrors(e);
  }
};