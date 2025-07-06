console.log("TMDB_API_KEY loaded:", process.env.TMDB_API_KEY);

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies(page = 1) {
  if (!API_KEY) {
    console.error("TMDB_API_KEY is missing. Check .env.local and restart the server.");
    return { results: [] };
  }

  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.status}`);
  }

  return res.json();
}
