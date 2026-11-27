// @vitest-environment node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  contentRoot,
  getContent,
  getDoc,
  IGNORED_IMAGES,
  loadContent,
  type Content,
} from "@/lib/content";

const imagePlacement = (content: Content) =>
  content.assets
    .filter((a) => /\.(svg|png|jpe?g|webp|gif)$/i.test(a))
    .filter((a) => !IGNORED_IMAGES.includes(a))
    .map((a) => {
      const url = `/content/${a.split("/").map(encodeURIComponent).join("/")}`;
      return {
        a,
        on: content.docs.filter(
          (d) => d.body.includes(url) || d.images.some((i) => i.src === url),
        ),
      };
    });

describe("content (real notes)", () => {
  const content = getContent();

  it("loads categories and docs", () => {
    expect(content.categories.length).toBeGreaterThan(0);
    expect(content.docs.length).toBeGreaterThan(content.categories.length);
  });

  it("has unique, URL-safe slugs and a title for every doc", () => {
    const slugs = content.docs.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const d of content.docs) {
      expect(d.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/);
      expect(d.title.trim()).not.toBe("");
      expect(d.title).not.toBe("Concept");
      expect(d.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("maps the root README to Overview and returns undefined for missing docs", () => {
    expect(getDoc("overview")?.title).toBe("Overview");
    expect(getDoc("does/not/exist")).toBeUndefined();
  });

  it("rewrites note links to doc URLs", () => {
    expect(getDoc("overview")!.body).toContain("(/docs/mit-license/license-name)");
    expect(getDoc("overview")!.body).not.toMatch(/\]\(\.\/_\d+/);
  });

  it("places every repo image on at least one page", () => {
    for (const { a, on } of imagePlacement(content))
      expect(on.length, `${a} is on no page`).toBeGreaterThan(0);
  });

  it("never serves files from website/, .git or .claude", () => {
    for (const a of content.assets)
      expect(a).not.toMatch(/(^|\/)(website|\.git|\.claude|node_modules)\//);
    expect(fs.existsSync(path.join(contentRoot(), "website"))).toBe(true);
  });
});

describe("content (image fixture)", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "notes-"));
  const write = (p: string, s = "<svg/>") => {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), s);
  };
  write("README.md", "# Notes\n\nRoot readme.");
  write(
    "01_Intro/README.md",
    "# Intro\n\nSee ![a](./my%20diagram.svg) and <img src=\"flow.png\"> and [gone](missing.md) and [next](./guides/validation-vs-escaping.md).",
  );
  write("01_Intro/my diagram.svg");
  write("01_Intro/flow.png");
  write("01_Intro/guides/validation-vs-escaping.md", "# Validation vs escaping\n\nBody text here.");
  write("01_Intro/guides/validation.svg");
  write("01_Intro/guides/stray.svg");
  write("01_Intro/guides/empty.md", "");
  write("01_Intro/diagrams/only.svg");
  write("01_Intro/viz.html", "<p>hi</p>");
  write("website/package.json", "{}");
  write("website/leak.svg");
  write(".claude/x.svg");
  const c = loadContent(root);
  const intro = c.docs.find((d) => d.slug === "intro")!;
  const guide = c.docs.find((d) => d.slug === "intro/guides/validation-vs-escaping")!;

  it("renders linked images and rewrites links", () => {
    expect(intro.body).toContain("/content/01_Intro/my%20diagram.svg");
    expect(intro.body).toContain('src="/content/01_Intro/flow.png"');
    expect(intro.body).toContain("and gone and");
    expect(intro.body).toContain("[next](/docs/intro/guides/validation-vs-escaping)");
    expect(intro.title).toBe("Intro");
    expect(intro.visualizations).toEqual(["/content/01_Intro/viz.html"]);
  });

  it("places images by file name and by folder", () => {
    expect(guide.images.map((i) => i.src)).toContain("/content/01_Intro/guides/validation.svg");
    expect(guide.group).toBe("Guides");
    // stray.svg has no link or name match: nearest doc in its folder
    expect(c.docs.some((d) => d.images.some((i) => i.src.endsWith("/stray.svg")))).toBe(true);
  });

  it("gives an image-only folder its own page", () => {
    const page = c.docs.find((d) => d.slug === "intro/diagrams");
    expect(page?.images.map((i) => i.src)).toEqual(["/content/01_Intro/diagrams/only.svg"]);
  });

  it("puts every image on a page and excludes website/.claude", () => {
    for (const { a, on } of imagePlacement(c)) expect(on.length, a).toBeGreaterThan(0);
    expect(c.assets.some((a) => /website|\.claude/.test(a))).toBe(false);
  });

  it("keeps empty notes", () => {
    expect(c.docs.find((d) => d.slug === "intro/guides/empty")?.body).toBe("");
  });
});
