import { NextResponse } from "next/server";

export function sendErrorResponse(data: string, statusCode: number) {
  return NextResponse.json({ message: data }, { status: statusCode });
}
