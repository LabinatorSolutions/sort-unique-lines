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
});
