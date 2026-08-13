export interface LineRange {
  start: number;
  end: number;
}

/**
 * Normalize a set of line ranges so they can be applied as a single editor edit.
 * Ranges are sorted by start line and overlapping ones are merged, because
 * VS Code rejects an edit that touches the same range twice.
 */
export function mergeLineRanges(ranges: LineRange[]): LineRange[] {
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged: LineRange[] = [];

  for (const range of sorted) {
    const last = merged[merged.length - 1];
    if (last && range.start <= last.end) {
      last.end = Math.max(last.end, range.end);
    } else {
      merged.push({ start: range.start, end: range.end });
    }
  }

  return merged;
}
