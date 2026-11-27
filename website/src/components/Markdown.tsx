import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

const components: Components = {
  table: ({ node, ...props }) => {
    void node;
    return (
      <div className="overflow-x-auto">
        <table {...props} />
      </div>
    );
  },
  a: ({ node, href = "", ...props }) => {
    void node;
    if (href.startsWith("/docs/")) return <Link href={href} {...props} />;
    const external = /^https?:/.test(href)
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return <a href={href} {...external} {...props} />;
  },
  img: ({ node, alt = "", ...props }) => {
    void node;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} loading="lazy" {...props} />;
  },
};

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      // Notes are trusted (they live in this repo), so raw HTML is allowed.
      rehypePlugins={[rehypeRaw, [rehypeHighlight, { detect: false }]]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}
