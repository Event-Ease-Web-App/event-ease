import { NextResponse } from "next/server";

export function sendErrorResponse(data: string, statusCode: number) {
  return NextResponse.json({ data }, { status: statusCode });
}
