import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; // Correct server-side import

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    if (!username || !username.trim()) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // MUST await createClient()
    const supabase = await createClient();

    // Get auth user (supabase_id)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Insert into the app_user table
    const { error: insertError } = await supabase
      .from("app_user")
      .insert({
        username,
        supabase_id: user.id, // PK from auth.users
      });

    if (insertError) {
      console.error(insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error("Unexpected Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
