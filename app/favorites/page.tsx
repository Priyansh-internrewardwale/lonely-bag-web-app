"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  const toggleFavorite = (movieId: string) => {
    const updated = favorites.filter((m) => m.id !== movieId);
    setFavorites(updated);
    localStorage.setItem("favorites-data", JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = localStorage.getItem("favorites-data");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const router = useRouter();

  const validFavorites = favorites.filter((m) => m && m.id && m.title);

  return (
    <div className="p-4">
      <button
        onClick={() => router.push("/movies")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded"
      >
        ← Go Back
      </button>
      <h1 className="text-xl font-bold mb-4">My Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600">You haven’t added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {validFavorites.map((movie) => (
            <Link
              href={`/movie/${movie.id}`}
              key={`${movie.id}-${movie.title}`}
            >
              <div className="relative bg-white rounded shadow overflow-hidden hover:scale-105 transition">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(movie.id);
                  }}
                  className="absolute top-2 right-2 text-4xl z-10"
                  title="Remove from Favorites"
                >
                  ❤️
                </button>

                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/fallback.jpg"
                  }
                  alt={movie.title || "Favorite movie poster"}
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
      )}
    </div>
  );
}
