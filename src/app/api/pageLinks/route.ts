import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createPageLink,
  deletePageLink,
  updatePageLink,
} from "@/lib/api/pageLinks/mutations";
import { 
  pageLinkIdSchema,
  insertPageLinkParams,
  updatePageLinkParams 
} from "@/lib/db/schema/pageLinks";

export async function POST(req: Request) {
  try {
    const validatedData = insertPageLinkParams.parse(await req.json());
    const { pageLink } = await createPageLink(validatedData);

    revalidatePath("/pageLinks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(pageLink, { status: 201 });
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

    const validatedData = updatePageLinkParams.parse(await req.json());
    const validatedParams = pageLinkIdSchema.parse({ id });

    const { pageLink } = await updatePageLink(validatedParams.id, validatedData);

    return NextResponse.json(pageLink, { status: 200 });
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

    const validatedParams = pageLinkIdSchema.parse({ id });
    const { pageLink } = await deletePageLink(validatedParams.id);

    return NextResponse.json(pageLink, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
