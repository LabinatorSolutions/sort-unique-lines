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

  // Compute the comparison key once per line rather than inside the comparator,
  // which would lowercase every line O(log n) times over.
  const keyed = lines.map((line) => ({
    line,
    key: options.caseSensitive ? line : line.toLowerCase(),
  }));

  const direction = options.sortOrder === "descending" ? -1 : 1;
  keyed.sort((a, b) => {
    if (a.key < b.key) {
      return -direction;
    }
    if (a.key > b.key) {
      return direction;
    }
    return 0;
  });

  // Equal keys are adjacent after sorting, so a single pass dedupes.
  const unique: string[] = [];
  let previousKey: string | undefined;
  for (const { line, key } of keyed) {
    if (key !== previousKey) {
      unique.push(line);
      previousKey = key;
    }
  }

  return unique.join(eol);
}
