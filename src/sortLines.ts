export interface SortOptions {
  sortOrder: "ascending" | "descending";
  caseSensitive: boolean;
  removeBlankLines: boolean;
  trimLines: boolean;
}

export function sortUniqueLines(text: string, eol: string, options: SortOptions): string {
  let lines = text.split(/\r?\n/);

  if (options.trimLines) {
    lines = lines.map((l) => l.trim());
  }

  if (options.removeBlankLines) {
    lines = lines.filter((l) => l.trim().length > 0);
  }

  const cmp = (a: string, b: string): number => {
    const ca = options.caseSensitive ? a : a.toLowerCase();
    const cb = options.caseSensitive ? b : b.toLowerCase();
    if (ca < cb) {
      return -1;
    }
    if (ca > cb) {
      return 1;
    }
    return 0;
  };

  lines.sort((a, b) => (options.sortOrder === "descending" ? cmp(b, a) : cmp(a, b)));

  const unique: string[] = [];
  for (const line of lines) {
    if (unique.length === 0) {
      unique.push(line);
      continue;
    }
    const last = unique[unique.length - 1];
    const same = options.caseSensitive ? last === line : last.toLowerCase() === line.toLowerCase();
    if (!same) {
      unique.push(line);
    }
  }

  return unique.join(eol);
}
