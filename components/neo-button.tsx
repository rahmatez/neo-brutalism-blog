"use client";

import type { ReactNode } from "react";
import { Button } from "neobrutalism-ui-react";
import type { ComponentProps } from "react";

type Props = {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: ComponentProps<typeof Button>["tone"];
};

export function NeoButton({ children, size = "sm", tone }: Props) {
  return (
    <Button size={size} tone={tone}>
      {children}
    </Button>
  );
}
