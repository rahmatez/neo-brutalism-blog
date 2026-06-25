"use client";

import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "neobrutalism-ui-react";

export type BreadcrumbEntry = {
  label: string;
  href?: string;
};

export function SiteBreadcrumb({ items }: { items: BreadcrumbEntry[] }) {
  if (items.length === 0) return null;

  return (
    <Breadcrumb className="mb-4 overflow-x-auto pb-1 md:mb-6">
      <BreadcrumbList className="flex-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage className="max-w-40 truncate sm:max-w-xs md:max-w-xs">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <Link
                    href={item.href}
                    data-nb-breadcrumb-link=""
                    className="underline decoration-(--nb-border) underline-offset-4 hover:bg-(--nb-yellow)"
                  >
                    {item.label}
                  </Link>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
