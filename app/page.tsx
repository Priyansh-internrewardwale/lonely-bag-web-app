import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          🎬 Welcome to <span className="text-blue-400">Movie Explorer</span>
        </h1>

        <p className="text-lg text-gray-300">
          Built with Next.js, Tailwind CSS and Typescript. <br />
          Discover trending films powered by the TMDB API 🍿.
        </p>

        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Login to Explore →
        </Link>
      </div>
    </main>
  );
}
