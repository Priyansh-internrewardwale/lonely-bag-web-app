"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/movies");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-black text-black dark:text-white p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md space-y-4 w-80"
      >
        <h2 className="text-xl font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
