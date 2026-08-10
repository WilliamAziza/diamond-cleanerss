"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import diamondImage from "../../../components/diamond.jpeg";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Diamond image background */}
      <Image
        src={diamondImage}
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-blue-950/85" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-2xl ring-4 ring-cyan-400/40 shadow-2xl">
            <Image
              src={diamondImage}
              alt="Diamond Clean Services"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Diamond Cleaning Admin
          </h1>
          <p className="mt-2 text-blue-200">Sign in to manage bookings</p>
        </div>

        <div className="rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-blue-600 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <a
            href="/"
            className="mt-5 block text-center text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to websites
          </a>
        </div>
      </div>
    </div>
  );
}
