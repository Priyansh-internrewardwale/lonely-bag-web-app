import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch movie" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Movie fetch error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
