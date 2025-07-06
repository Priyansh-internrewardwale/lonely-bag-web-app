import { notFound } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/BackButton";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function getMovie(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/movie/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);

  if (!movie) return notFound();

  return (
    <div className="p-4 max-w-4xl mx-auto text-gray-900 dark:text-gray-100">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/fallback.jpg"
          }
          alt={movie.title}
          width={500}
          height={750}
          className="rounded shadow w-full md:w-auto"
        />

        <div className="space-y-4">
          <p>
            <span className="font-semibold">Release Date:</span>{" "}
            {movie.release_date}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> ⭐{" "}
            {movie.vote_average}
          </p>
          <p>
            <span className="font-semibold">Runtime:</span> {movie.runtime}{" "}
            minutes
          </p>
          <p>
            <span className="font-semibold">Genres:</span>{" "}
            {movie.genres.map((g: any) => g.name).join(", ")}
          </p>
          <p className="text-sm leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
