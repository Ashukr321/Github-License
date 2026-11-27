"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-red-600 uppercase dark:text-red-400">
          Error
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Try again, or go back to the home page.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
