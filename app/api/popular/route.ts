import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3";

async function safeFetch(url: string, retries = 2): Promise<Response> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res;
  } catch (err) {
    if (retries > 0) {
      console.warn(`Retrying fetch... attempts left: ${retries}`);
      return await safeFetch(url, retries - 1);
    }
    throw err;
  }
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  const page = req.nextUrl.searchParams.get("page") || "1";

  const isSearch = query.trim().length > 0;
  const endpoint = isSearch ? "search/movie" : "movie/popular";
  const searchParam = isSearch ? `&query=${encodeURIComponent(query)}` : "";

  const url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&page=${page}${searchParam}`;

  try {
    const res = await safeFetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching movies from TMDB:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

