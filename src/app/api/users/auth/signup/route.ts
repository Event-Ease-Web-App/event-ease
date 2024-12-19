import { NextResponse } from "next/server";
import { AuthService } from "@/services/AuthService";

export async function POST(req: Request) {
  const _authService = new AuthService();
  const result = await _authService._manageUserRegister(req);
  if (result.status !== 201) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  }
  return NextResponse.json(
    {
      message:
        "Bienvenue ! Veuillez consulter votre boîte de réception pour confirmer votre adresse e-mail",
    },
    { status: result.status }
  );
}
