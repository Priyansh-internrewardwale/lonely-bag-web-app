import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MovieGrid from "@/components/MovieGrid";

export default async function MoviesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return <MovieGrid />;
}
