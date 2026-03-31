/// backend logic for logging out

'use server'

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // if something goes wrong
  return NextResponse.redirect(new URL("/auth/auth-code-error", request.url));
}