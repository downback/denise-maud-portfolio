import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/server"

type BioPayload = {
  title?: string
  location?: string
  year?: number
}

export async function POST(request: Request) {
  try {
    const supabase = await supabaseServer()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    const body = (await request.json()) as BioPayload
    const title = body.title?.trim()
    const location = body.location?.trim()
    const year = body.year

    if (!title || !location || !year) {
      return NextResponse.json(
        { error: "Title, location, and year are required." },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("bio_solo_shows")
      .insert({
        title,
        location,
        year,
        updated_by: user.id,
      })
      .select("id, title, location, year")
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: "Unable to create solo show entry." },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Solo show create failed", { error })
    return NextResponse.json(
      { error: "Server error while creating solo show." },
      { status: 500 }
    )
  }
}
