import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-display mb-4 mt-14 text-2xl font-semibold tracking-tight md:text-3xl">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display mb-3 mt-10 text-xl font-semibold tracking-tight">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-6 leading-[1.75] text-foreground/85">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-foreground/85">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-foreground/85">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ children, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 rounded-r-2xl border-l-2 border-accent bg-accent-soft/50 py-4 pl-6 pr-5 text-foreground/80">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  hr: () => <hr className="my-12 border-border" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
