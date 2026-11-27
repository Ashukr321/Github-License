import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  const { categories, docs } = getContent();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300">
        {docs.length} topics · {categories.length} categories
      </span>
      <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
        {site.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
        {site.description}
      </p>
      <Link
        href={`/docs/${docs[0].slug}`}
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
      >
        Start reading <ArrowRight className="size-4" />
      </Link>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/docs/${cat.docs[0].slug}`}
            className="group rounded-xl border border-slate-200 p-5 transition hover:border-violet-500/50 hover:bg-violet-500/5 dark:border-slate-800"
          >
            <h2 className="font-semibold group-hover:text-violet-700 dark:group-hover:text-violet-300">
              {cat.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {cat.docs.length} {cat.docs.length === 1 ? "topic" : "topics"}
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              {cat.docs.slice(0, 4).map((d) => (
                <li key={d.slug} className="truncate">
                  {d.title}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
}
