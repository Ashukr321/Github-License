import fs from "node:fs";
import path from "node:path";

export type DocImage = { src: string; alt: string };
export type Doc = {
  slug: string;
  title: string;
  description: string;
  body: string;
  category: string;
  categoryTitle: string;
  group?: string;
  /** Repo-relative path of the markdown file, or the folder for image-only pages. */
  file: string;
  images: DocImage[];
  visualizations: string[];
};
export type Category = { slug: string; title: string; docs: Doc[] };
export type Content = { categories: Category[]; docs: Doc[]; assets: string[] };

export const ASSET_EXT = /\.(svg|png|jpe?g|webp|gif|html)$/i;
const FILE_EXT = /\.(md|svg|png|jpe?g|webp|gif|html)$/i;
const IMAGE_EXT = /\.(svg|png|jpe?g|webp|gif)$/i;
const SKIP_DIRS = new Set(["website", "node_modules", ".git", ".claude"]);
const CATEGORY_RE = /^_?\d+[_\-\s]+(.+)$/;
const ACRONYMS = new Set(
  "xss csrf api apis mit gnu gpl lgpl agpl bsd mpl epl cc0 oss faq saas http https url html css json jwt cors dom sql ui".split(
    " ",
  ),
);

/** Repo-relative paths of images that are unrelated to the notes and must not be placed on a page. */
export const IGNORED_IMAGES: string[] = [];

export const contentRoot = () =>
  process.env.CONTENT_DIR ??
  path.join(/*turbopackIgnore: true*/ process.cwd(), "..");

export const humanize = (name: string) =>
  name
    .replace(FILE_EXT, "")
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) =>
      ACRONYMS.has(w.toLowerCase())
        ? w.toUpperCase()
        : /^v\d/.test(w)
          ? w
          : w[0].toUpperCase() + w.slice(1),
    )
    .join(" ");

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const words = (s: string) =>
  path.posix
    .basename(s)
    .replace(FILE_EXT, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

const isDocName = (n: string) => /\.md$/i.test(n);
const isReadme = (f: string) => /(^|\/)readme\.md$/i.test(f);
const plain = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

function listDir(dir: string) {
  return fs
    .readdirSync(/*turbopackIgnore: true*/ dir, { withFileTypes: true })
    .filter((e) => !e.name.startsWith(".") && !SKIP_DIRS.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
}

function walkAssets(root: string, rel = ""): string[] {
  return listDir(path.join(/*turbopackIgnore: true*/ root, rel)).flatMap(
    (e) => {
      const p = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) return walkAssets(root, p);
      return ASSET_EXT.test(e.name) ? [p] : [];
    },
  );
}

/** Title + body with the leading H1 removed (when it is short enough to be the title). */
function parse(raw: string, fallback: string, forced: boolean) {
  let body = raw.replace(/\r\n/g, "\n");
  let title = fallback;
  const head = body.split(/^```/m)[0];
  const md = head.match(/^#\s+(.+?)\s*#*\s*$/m);
  const html = head.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 =
    md && html ? (md.index! < html.index! ? md : html) : (md ?? html);
  if (h1) {
    const text = plain(h1[1]);
    if (text && text.length <= 60) {
      body = body.replace(h1[0], "");
      if (!forced) title = text;
    }
  }
  return { title, body: body.trim() };
}

function describe(body: string) {
  let inFence = false;
  const para: string[] = [];
  for (const line of body.split("\n")) {
    const t = line.trim();
    if (t.startsWith("```")) {
      inFence = !inFence;
      if (para.length) break;
      continue;
    }
    if (inFence) continue;
    if (!t || /^(#|<|\||>|[-*+]\s|\d+\.\s|!\[|\[!\[|---|===)/.test(t)) {
      if (para.length) break;
      continue;
    }
    para.push(t);
  }
  const text = plain(para.join(" "));
  if (text.length <= 160) return text;
  return text.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

export function loadContent(root: string): Content {
  const categories: Category[] = [];
  const docsByDir = new Map<string, Doc[]>();
  const assets = walkAssets(root).filter((p) => !IGNORED_IMAGES.includes(p));
  const imageSet = new Set(assets.filter((p) => IMAGE_EXT.test(p)));

  const addDoc = (dir: string, doc: Doc) => {
    if (!docsByDir.has(dir)) docsByDir.set(dir, []);
    docsByDir.get(dir)!.push(doc);
  };

  const makeDoc = (
    file: string,
    slug: string,
    cat: Category,
    folderTitle: string,
    group?: string,
  ): Doc => {
    const raw = fs.readFileSync(
      /*turbopackIgnore: true*/ path.join(root, file),
      "utf8",
    );
    const name = path.posix.basename(file);
    const forced = isReadme(file) || /^concept\.md$/i.test(name);
    const parsed = parse(raw, forced ? folderTitle : humanize(name), forced);
    return {
      slug,
      ...parsed,
      description: "",
      category: cat.slug,
      categoryTitle: cat.title,
      group,
      file,
      images: [],
      visualizations: [],
    };
  };

  const walk = (
    rel: string,
    slugBase: string,
    cat: Category,
    folderTitle: string,
    group?: string,
  ) => {
    const entries = listDir(path.join(/*turbopackIgnore: true*/ root, rel));
    const md = entries
      .filter((e) => e.isFile() && isDocName(e.name))
      .sort((a, b) => Number(isReadme(b.name)) - Number(isReadme(a.name)));
    for (const e of md) {
      const file = `${rel}/${e.name}`;
      const slug = isReadme(e.name)
        ? slugBase
        : `${slugBase}/${slugify(e.name.replace(/\.md$/i, ""))}`;
      const doc = makeDoc(file, slug, cat, folderTitle, group);
      cat.docs.push(doc);
      addDoc(rel, doc);
    }
    if (!md.length && entries.some((e) => e.isFile() && IMAGE_EXT.test(e.name))) {
      // A folder of diagrams with no notes still gets a page so its images show.
      const doc: Doc = {
        slug: slugBase,
        title: folderTitle,
        description: "",
        body: "",
        category: cat.slug,
        categoryTitle: cat.title,
        group,
        file: rel,
        images: [],
        visualizations: [],
      };
      cat.docs.push(doc);
      addDoc(rel, doc);
    }
    for (const e of entries.filter((e) => e.isDirectory())) {
      const title = humanize(e.name);
      walk(`${rel}/${e.name}`, `${slugBase}/${slugify(e.name)}`, cat, title, title);
    }
  };

  for (const e of listDir(root)) {
    const m = e.isDirectory() && e.name.match(CATEGORY_RE);
    if (!m) continue;
    const title = humanize(m[1]);
    const cat: Category = { slug: slugify(m[1]), title, docs: [] };
    walk(e.name, cat.slug, cat, title);
    if (cat.docs.length) categories.push(cat);
  }

  const rootReadme = listDir(root).find((e) => e.isFile() && isReadme(e.name));
  if (rootReadme && categories.length) {
    const doc = makeDoc(rootReadme.name, "overview", categories[0], "Overview");
    categories[0].docs.unshift(doc);
    addDoc("", doc);
  }

  const docs = categories.flatMap((c) => c.docs);
  const docByFile = new Map(docs.map((d) => [d.file, d]));
  const placed = new Set<string>();

  const isRelative = (u: string) => !!u && !/^([a-z][a-z0-9+.-]*:|\/|#)/i.test(u);
  const assetUrl = (p: string) => `/content/${p.split("/").map(encodeURIComponent).join("/")}`;

  for (const doc of docs) {
    if (!isDocName(doc.file)) continue;
    const dir = path.posix.dirname(doc.file).replace(/^\.$/, "");
    const resolve = (u: string) => {
      let clean = u.split(/[?#]/)[0];
      try {
        clean = decodeURIComponent(clean);
      } catch {}
      return path.posix
        .normalize(path.posix.join(dir || ".", clean))
        .replace(/\/$/, "")
        .replace(/^\.$/, "");
    };
    const image = (u: string) => {
      if (!isRelative(u)) return u;
      const p = resolve(u);
      if (!imageSet.has(p)) return u;
      placed.add(p);
      return assetUrl(p);
    };
    doc.body = doc.body
      .replace(
        /(!\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g,
        (_, a, u, b) => a + image(u) + b,
      )
      .replace(
        /(<img\b[^>]*?\ssrc=["'])([^"']+)(["'])/gi,
        (_, a, u, b) => a + image(u) + b,
      )
      // shortcut: raw HTML <a href> to notes is not rewritten; add it if notes start using it.
      .replace(
        /(?<!!)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
        (m, text, u) => {
          if (!isRelative(u)) return m;
          const p = resolve(u);
          const hash = u.includes("#") ? u.slice(u.indexOf("#")) : "";
          const target = docByFile.get(p) ?? docsByDir.get(p)?.[0];
          if (target) return `[${text}](/docs/${target.slug}${hash})`;
          if (assets.includes(p)) return `[${text}](${assetUrl(p)})`;
          return text; // missing note: plain text instead of a 404 link
        },
      );
    doc.description = describe(doc.body);
  }

  const inBody = (doc: Doc, p: string) => doc.body.includes(assetUrl(p));
  const attach = (doc: Doc, p: string) => {
    if (!inBody(doc, p) && !doc.images.some((i) => i.src === assetUrl(p)))
      doc.images.push({ src: assetUrl(p), alt: humanize(path.posix.basename(p)) });
  };
  const nearest = (p: string) => {
    let d = path.posix.dirname(p).replace(/^\.$/, "");
    for (;;) {
      const list = docsByDir.get(d);
      if (list?.length) return list.find((x) => isReadme(x.file)) ?? list[0];
      if (!d) return undefined;
      d = path.posix.dirname(d).replace(/^\.$/, "");
    }
  };

  for (const p of imageSet) {
    const w = words(p);
    for (const doc of docs) {
      if (!isDocName(doc.file)) continue;
      const dw = new Set(words(doc.file));
      if (w.length && w.every((x) => dw.has(x))) {
        attach(doc, p);
        placed.add(p);
      }
    }
  }
  for (const p of imageSet) {
    if (placed.has(p)) continue;
    const doc = nearest(p);
    if (doc) attach(doc, p);
  }
  for (const p of assets.filter((a) => /\.html$/i.test(a))) {
    nearest(p)?.visualizations.push(assetUrl(p));
  }

  for (const doc of docs)
    if (!doc.description)
      doc.description = `${doc.title} — ${doc.categoryTitle}.`;

  return { categories, docs, assets };
}

let cache: Content | undefined;
export function getContent(): Content {
  if (process.env.NODE_ENV !== "production") return loadContent(contentRoot());
  return (cache ??= loadContent(contentRoot()));
}

export const getDoc = (slug: string) =>
  getContent().docs.find((d) => d.slug === slug);

export type NavData = {
  slug: string;
  title: string;
  docs: { slug: string; title: string; group?: string }[];
}[];

export const getNav = (): NavData =>
  getContent().categories.map((c) => ({
    slug: c.slug,
    title: c.title,
    docs: c.docs.map(({ slug, title, group }) => ({ slug, title, group })),
  }));
