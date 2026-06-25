"use client";

import type { ReactNode } from "react";
import { NeoBrutalismProvider } from "neobrutalism-ui-react";

export function NeoProvider({ children }: { children: ReactNode }) {
  return <NeoBrutalismProvider>{children}</NeoBrutalismProvider>;
}
