"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded shadow overflow-hidden">
    <div className="bg-gray-300 w-full h-[300px]" />
    <div className="p-2 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
    </div>
  </div>
);

export default function MovieGrid() {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref: sentinelRef, inView } = useInView();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const syncFavorites = () => {
      const stored = localStorage.getItem("favorites-data");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    };

    syncFavorites();
    window.addEventListener("visibilitychange", syncFavorites);
    return () => window.removeEventListener("visibilitychange", syncFavorites);
  }, []);

  const toggleFavorite = (movie: any) => {
    const exists = favorites.find((fav) => fav.id === movie.id);
    const updated = exists
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites-data", JSON.stringify(updated));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
      setMovies([]);
      setPage(1);
      setHasMore(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!hasMore) return;

      const isDefaultQuery = debouncedQuery.trim() === "";
      const isInitialPage = page === 1;
      const alreadyHasMovies = movies.length > 0;

      if (isDefaultQuery && isInitialPage && alreadyHasMovies) {
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `/api/popular?page=${page}&query=${debouncedQuery}`
        );
        const data = await res.json();

        if (!data.results || !Array.isArray(data.results)) {
          console.error("Invalid response from API:", data);
          return;
        }

        if (data.results.length === 0) {
          setHasMore(false);
          return;
        }

        setMovies((prev) => [...prev, ...data.results]);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, debouncedQuery]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading, hasMore]);

  const isFavorite = (movieId: number) =>
    favorites.some((fav) => fav.id === movieId);

  return (
    <>
      <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link
          href="/favorites"
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Favorites ❤️
        </Link>
      </div>

      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            key={`${movie.id}-${movie.title}-${Math.random()
              .toString(36)
              .substring(2, 8)}`}
          >
            <div className="relative bg-white rounded shadow overflow-hidden hover:scale-105 transition">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(movie);
                }}
                className="absolute top-2 right-2 text-4xl z-10"
              >
                {isFavorite(movie.id) ? "❤️" : "🤍"}
              </button>

              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/fallback.jpg"
                }
                alt={movie.title || "Movie poster"}
                width={500}
                height={750}
                className="w-full h-auto"
              />

              <div className="p-2">
                <h2 className="font-semibold text-sm">{movie.title}</h2>
                <p className="text-sm">⭐ {movie.vote_average}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {loading && movies.length === 0 && (
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {loading && movies.length > 0 && (
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={`loading-${index}`} />
          ))}
        </div>
      )}

      <div ref={sentinelRef} className="h-1"></div>
    </>
  );
}
