"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Add useRouter for client-side redirect
import { signIn } from "../../actions/auth";

export default function SignIn() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Initialize router

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setError("");

    try {
      const result = await signIn(formData);
      setIsSubmitting(false);
      if (result?.error) {
        setError(result.error);
      } else {
        console.log("SignIn: Authentication successful, redirecting to /dashboard");
        router.push("/dashboard"); // Client-side redirect
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.message.includes("NEXT_REDIRECT")) {
        console.log("SignIn: Redirecting (NEXT_REDIRECT caught), should navigate to /dashboard");
        router.push("/dashboard"); // Fallback client-side redirect
      } else {
        setError(error.message || "An unexpected error occurred");
        console.error("SignIn: Unexpected Error:", error);
      }
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {error && <div className="p-2 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign up
        </Link>
      </p>
    </div>
  );
}