import type { ReactNode } from "react";
import { CounterDemo } from "@/components/counter-demo";
import { CodeBlock } from "@/components/code-block";
import {
  NeoMdxTable,
  NeoMdxTableBody,
  NeoMdxTableCell,
  NeoMdxTableHead,
  NeoMdxTableHeader,
  NeoMdxTableRow
} from "@/components/neo-table";

type CalloutType = "tip" | "info" | "warning";

function calloutTone(type: CalloutType) {
  if (type === "warning") return "var(--nb-warning)";
  if (type === "info") return "var(--nb-accent)";
  return "var(--nb-success)";
}

export function Callout({
  type = "info",
  children
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  return (
    <div
      className="neo-shell my-5 max-w-full overflow-x-auto p-4 font-semibold"
      style={{ background: calloutTone(type) }}
    >
      <span className="mr-2 uppercase tracking-wide text-xs">[{type}]</span>
      {children}
    </div>
  );
}

export const mdxComponents = {
  Callout,
  CounterDemo,
  pre: CodeBlock,
  table: NeoMdxTable,
  thead: NeoMdxTableHeader,
  tbody: NeoMdxTableBody,
  tr: NeoMdxTableRow,
  th: NeoMdxTableHead,
  td: NeoMdxTableCell
};
