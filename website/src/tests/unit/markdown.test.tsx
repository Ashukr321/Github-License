import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import Markdown from "@/components/Markdown";

it("syntax-highlights tagged code blocks and leaves plain blocks alone", () => {
  const html = renderToStaticMarkup(
    <Markdown>{"```ts\nconst x: number = 1;\n```\n\n```\nMIT License\n```"}</Markdown>,
  );
  expect(html).toContain('<span class="hljs-keyword">const</span>');
  expect(html).toContain("<code>MIT License\n</code>");
});
