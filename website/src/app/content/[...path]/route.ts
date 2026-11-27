import fs from "node:fs";
import path from "node:path";
import { contentRoot, getContent } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent().assets.map((p) => ({ path: p.split("/") }));
}

const TYPES: Record<string, string> = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  html: "text/html; charset=utf-8",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const rel = (await params).path.map(decodeURIComponent).join("/");
  // Only files listed by the loader are servable, never arbitrary repo paths.
  if (!getContent().assets.includes(rel))
    return new Response("Not found", { status: 404 });
  const file = fs.readFileSync(
    /*turbopackIgnore: true*/ path.join(contentRoot(), rel),
  );
  return new Response(file, {
    headers: {
      "Content-Type": TYPES[rel.split(".").pop()!.toLowerCase()],
      "Cache-Control": "public, max-age=3600",
    },
  });
}
