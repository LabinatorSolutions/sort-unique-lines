import { describe, expect, test } from "bun:test";
import { sortUniqueLines } from "./sortLines";

const base = {
  sortOrder: "ascending" as const,
  caseSensitive: false,
  removeBlankLines: true,
  trimLines: true,
};

describe("sortUniqueLines", () => {
  test("sorts ascending and dedupes case-insensitively", () => {
    const result = sortUniqueLines("banana\nApple\napple\nCherry", "\n", base);
    expect(result).toBe("Apple\nbanana\nCherry");
  });

  test("sorts descending", () => {
    const result = sortUniqueLines("a\nb\nc", "\n", { ...base, sortOrder: "descending" });
    expect(result).toBe("c\nb\na");
  });

  test("case-sensitive keeps distinct casing", () => {
    const result = sortUniqueLines("Apple\napple", "\n", { ...base, caseSensitive: true });
    expect(result).toBe("Apple\napple");
  });

  test("removes whitespace-only lines even when trimLines is false", () => {
    const result = sortUniqueLines("b\n   \na\n\t\nc", "\n", { ...base, trimLines: false });
    expect(result).toBe("a\nb\nc");
  });

  test("keeps blank lines when removeBlankLines is false", () => {
    const result = sortUniqueLines("b\n\na", "\n", { ...base, removeBlankLines: false });
    expect(result).toBe("\na\nb");
  });

  test("preserves untrimmed whitespace when trimLines is false", () => {
    const result = sortUniqueLines("  b  \n a ", "\n", { ...base, trimLines: false });
    expect(result).toBe("  b  \n a ");
  });

  test("uses provided eol for output", () => {
    const result = sortUniqueLines("b\na", "\r\n", base);
    expect(result).toBe("a\r\nb");
  });

  test("keeps the first occurrence of a case-insensitive duplicate", () => {
    const result = sortUniqueLines("zZz\nZZZ\nzzz", "\n", base);
    expect(result).toBe("zZz");
  });

  test("keeps the first occurrence when sorting descending", () => {
    const result = sortUniqueLines("b\nB\na", "\n", { ...base, sortOrder: "descending" });
    expect(result).toBe("b\na");
  });

  test("splits CRLF input regardless of the requested output eol", () => {
    const result = sortUniqueLines("b\r\na\r\nb", "\n", base);
    expect(result).toBe("a\nb");
  });

  test("returns an empty string when every line is stripped", () => {
    const result = sortUniqueLines("\n  \n\t\n", "\n", base);
    expect(result).toBe("");
  });

  test("handles a single line with no separator", () => {
    expect(sortUniqueLines("solo", "\n", base)).toBe("solo");
  });
});
