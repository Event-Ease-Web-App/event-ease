import { NextResponse } from "next/server";
import { z } from "zod";

export async function formFieldsValidation(
  req: Request,
  form: unknown,
  schema: z.ZodSchema
) {
  const contentType = req.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 400 }
    );
  }

  try {
    await schema.parseAsync(form);
    return NextResponse.json({ error: null }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.flatten() },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { error: "Unexpected validation error" },
      { status: 500 }
    );
  }
}
