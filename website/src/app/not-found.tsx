import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          This topic doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
        >
          Back to all topics
        </Link>
      </div>
    </main>
  );
}
