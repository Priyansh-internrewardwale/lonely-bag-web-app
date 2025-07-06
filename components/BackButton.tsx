"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/movies")}
      className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded"
    >
      ← Back to Movies
    </button>
  );
}
