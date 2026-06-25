"use client";

import { useState } from "react";

export function CounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="neo-shell my-6 p-5" style={{ background: "var(--nb-accent)" }}>
      <p className="mb-3 text-sm font-bold">Counter demo (komponen React di MDX)</p>
      <div className="flex items-center gap-3">
        <button
          className="rounded-md border-2 border-black bg-white px-3 py-1 font-black"
          style={{ boxShadow: "3px 3px 0 var(--nb-shadow)" }}
          onClick={() => setCount((v) => v - 1)}
          type="button"
        >
          -
        </button>
        <span className="text-xl font-black">{count}</span>
        <button
          className="rounded-md border-2 border-black bg-white px-3 py-1 font-black"
          style={{ boxShadow: "3px 3px 0 var(--nb-shadow)" }}
          onClick={() => setCount((v) => v + 1)}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}
