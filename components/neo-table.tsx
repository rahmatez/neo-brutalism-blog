"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "neobrutalism-ui-react";

function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function NeoMdxTable({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"table"> & { children: ReactNode }) {
  return (
    <div className="neo-mdx-table my-6 max-w-full">
      <Table
        {...props}
        className={cx(
          "w-max min-w-full border-4 border-black bg-(--nb-surface)",
          className
        )}
      >
        {children}
      </Table>
    </div>
  );
}

export function NeoMdxTableHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"thead">) {
  return <TableHeader {...props} className={cx("bg-(--nb-main)", className)} />;
}

export function NeoMdxTableBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"tbody">) {
  return <TableBody {...props} className={cx("bg-(--nb-surface)", className)} />;
}

export function NeoMdxTableRow({
  className,
  ...props
}: ComponentPropsWithoutRef<"tr">) {
  return <TableRow {...props} className={cx("border-b-2 border-black last:border-b-0", className)} />;
}

export function NeoMdxTableHead({
  className,
  ...props
}: ComponentPropsWithoutRef<"th">) {
  return (
    <TableHead
      {...props}
      className={cx(
        "border-r-2 border-black px-3 py-2 text-left text-sm font-black uppercase tracking-wide last:border-r-0 md:px-5 md:py-3 md:text-base",
        className
      )}
    />
  );
}

export function NeoMdxTableCell({
  className,
  ...props
}: ComponentPropsWithoutRef<"td">) {
  return (
    <TableCell
      {...props}
      className={cx(
        "border-r-2 border-black px-3 py-3 text-left align-top text-sm font-semibold leading-6 last:border-r-0 md:px-5 md:py-4 md:text-[1.02rem] md:leading-7",
        className
      )}
    />
  );
}

