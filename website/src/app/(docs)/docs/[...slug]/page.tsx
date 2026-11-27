import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Markdown from "@/components/Markdown";
import { getContent, getDoc } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent().docs.map((d) => ({ slug: d.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getDoc((await params).slug.join("/"));
  if (!doc) return {};
  const title = `${doc.title} — ${doc.categoryTitle}`;
  const url = `/docs/${doc.slug}`;
  return {
    title,
    description: doc.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description: doc.description, url },
  };
}

export default async function DocPage({ params }: Props) {
  const slug = (await params).slug.join("/");
  const doc = getDoc(slug);
  if (!doc) notFound();
  const { docs, categories } = getContent();
  const i = docs.indexOf(doc);
  const prev = docs[i - 1];
  const next = docs[i + 1];
  const category = categories.find((c) => c.slug === doc.category)!;

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1 text-sm text-slate-500"
      >
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
          {site.name}
        </Link>
        <ChevronRight className="size-3.5" />
        <Link
          href={`/docs/${category.docs[0].slug}`}
          className="hover:text-slate-900 dark:hover:text-white"
        >
          {doc.categoryTitle}
        </Link>
        {doc.group && (
          <>
            <ChevronRight className="size-3.5" />
            <span>{doc.group}</span>
          </>
        )}
        <ChevronRight className="size-3.5" />
        <span className="text-slate-700 dark:text-slate-300">{doc.title}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {doc.title}
      </h1>

      <div className="prose prose-slate dark:prose-invert prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-50 prose-pre:text-slate-800 dark:prose-pre:border-slate-800 dark:prose-pre:bg-[#0d1117] dark:prose-pre:text-slate-200 prose-img:rounded-lg mt-6 max-w-none">
        {doc.body.trim() ? (
          <Markdown>{doc.body}</Markdown>
        ) : (
          !doc.images.length && (
            <p className="text-slate-500 italic">
              This topic is still being written.
            </p>
          )
        )}

        {doc.images.map((img) => (
          <figure key={img.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} loading="lazy" />
            <figcaption>{img.alt}</figcaption>
          </figure>
        ))}
      </div>

      {doc.visualizations.map((src) => (
        <section key={src} className="mt-8">
          <iframe
            src={src}
            sandbox="allow-scripts"
            title={`${doc.title} visualization`}
            className="h-[70vh] w-full rounded-lg border border-slate-200 bg-white dark:border-slate-800"
          />
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm text-violet-600 hover:underline dark:text-violet-400"
          >
            Open full screen <ExternalLink className="size-3.5" />
          </a>
        </section>
      ))}

      <nav className="mt-12 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2 dark:border-slate-800">
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="group rounded-xl border border-slate-200 p-4 hover:border-violet-500/50 dark:border-slate-800"
          >
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <ChevronLeft className="size-3.5" /> Previous
            </span>
            <span className="mt-1 block font-medium group-hover:text-violet-700 dark:group-hover:text-violet-300">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/docs/${next.slug}`}
            className="group rounded-xl border border-slate-200 p-4 text-right hover:border-violet-500/50 dark:border-slate-800"
          >
            <span className="flex items-center justify-end gap-1 text-xs text-slate-500">
              Next <ChevronRight className="size-3.5" />
            </span>
            <span className="mt-1 block font-medium group-hover:text-violet-700 dark:group-hover:text-violet-300">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
