export type TocItem = {
  text: string;
  level: 2 | 3;
  id: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractTocFromMdx(source: string): TocItem[] {
  const lines = source.split("\n");
  const toc: TocItem[] = [];
  const slugCount = new Map<string, number>();
  let inCodeFence = false;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const rawText = match[2].replace(/\[(.*?)\]\(.*?\)/g, "$1").replace(/`/g, "").trim();
    const base = slugify(rawText);
    const used = slugCount.get(base) ?? 0;
    slugCount.set(base, used + 1);
    const id = used === 0 ? base : `${base}-${used}`;

    toc.push({ text: rawText, level, id });
  }

  return toc;
}

