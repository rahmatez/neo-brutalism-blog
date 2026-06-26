"use client";

import type { ReactNode } from "react";
import { isValidElement } from "react";
import { useState } from "react";

type CodeBlockProps = {
  children: ReactNode;
};

type CodeElementProps = {
  className?: string;
  children?: ReactNode;
  "data-language"?: string;
};

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // MDXRemote biasanya menghasilkan: <pre><code class="language-xxx">...</code></pre>
  const codeEl = Array.isArray(children) ? children[0] : children;
  const codeClassName = isValidElement<CodeElementProps>(codeEl) ? codeEl.props.className : undefined;
  const dataLanguage = isValidElement<CodeElementProps>(codeEl)
    ? codeEl.props["data-language"]
    : undefined;

  const extractText = (node: ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (isValidElement<CodeElementProps>(node)) return extractText(node.props.children);
    return "";
  };

  const rawCode = extractText(
    isValidElement<CodeElementProps>(codeEl) ? codeEl.props.children : codeEl
  );

  const languageMatch = typeof codeClassName === "string"
    ? /language-([\w-]+)/.exec(codeClassName)
    : null;

  const language = (languageMatch?.[1] ?? dataLanguage ?? "template").toUpperCase();
  const title = language.replace("-", " ");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(String(rawCode).trimEnd());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // abaikan error copy
    }
  }

  return (
    <div
      className="my-6 max-w-full overflow-hidden rounded-2xl border-[3px] border-black shadow-[4px_4px_0_var(--nb-shadow)] md:shadow-[8px_8px_0_var(--nb-shadow)]"
      style={{ background: "var(--nb-foreground)" }}
    >
      <div
        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b-[3px] border-black px-4 py-2"
        style={{ background: "color-mix(in oklab, var(--nb-foreground) 70%, white 30%)" }}
      >
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border border-black/40 bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full border border-black/40 bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full border border-black/40 bg-[#28c840]" />
        </div>
        <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-200">
          {title}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] transition"
          style={{
            borderColor: "color-mix(in oklab, var(--nb-surface) 35%, var(--nb-foreground) 65%)",
            background: "color-mix(in oklab, var(--nb-foreground) 78%, white 22%)",
            color: "var(--nb-surface)"
          }}
        >
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <div className="px-4 py-4 text-sm leading-relaxed text-zinc-200" style={{ background: "var(--nb-foreground)" }}>
        <pre className="m-0! border-0! bg-transparent! p-0! overflow-x-auto text-[15px] leading-8 text-zinc-200">
          {isValidElement(codeEl) ? (
            codeEl
          ) : (
            <code className={codeClassName}>{String(rawCode)}</code>
          )}
        </pre>
      </div>
    </div>
  );
}

