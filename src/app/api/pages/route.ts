import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createPage,
  deletePage,
  updatePage,
} from "@/lib/api/pages/mutations";
import { 
  pageIdSchema,
  insertPageParams,
  updatePageParams 
} from "@/lib/db/schema/pages";

export async function POST(req: Request) {
  try {
    const validatedData = insertPageParams.parse(await req.json());
    const { page } = await createPage(validatedData);

    revalidatePath("/pages"); // optional - assumes you will have named route same as entity

    return NextResponse.json(page, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updatePageParams.parse(await req.json());
    const validatedParams = pageIdSchema.parse({ id });

    const { page } = await updatePage(validatedParams.id, validatedData);

    return NextResponse.json(page, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = pageIdSchema.parse({ id });
    const { page } = await deletePage(validatedParams.id);

    return NextResponse.json(page, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
