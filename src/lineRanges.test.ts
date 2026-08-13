import { describe, expect, test } from "bun:test";
import { mergeLineRanges } from "./lineRanges";

describe("mergeLineRanges", () => {
  test("returns an empty list unchanged", () => {
    expect(mergeLineRanges([])).toEqual([]);
  });

  test("sorts disjoint ranges by start line", () => {
    expect(
      mergeLineRanges([
        { start: 10, end: 12 },
        { start: 0, end: 2 },
      ]),
    ).toEqual([
      { start: 0, end: 2 },
      { start: 10, end: 12 },
    ]);
  });

  test("keeps touching-but-not-overlapping ranges separate", () => {
    expect(
      mergeLineRanges([
        { start: 0, end: 2 },
        { start: 3, end: 5 },
      ]),
    ).toEqual([
      { start: 0, end: 2 },
      { start: 3, end: 5 },
    ]);
  });

  test("merges overlapping ranges", () => {
    expect(
      mergeLineRanges([
        { start: 0, end: 3 },
        { start: 2, end: 5 },
      ]),
    ).toEqual([{ start: 0, end: 5 }]);
  });

  test("merges multiple cursors landing on the same line", () => {
    expect(
      mergeLineRanges([
        { start: 4, end: 4 },
        { start: 4, end: 4 },
      ]),
    ).toEqual([{ start: 4, end: 4 }]);
  });

  test("merges a range fully contained in an earlier one", () => {
    expect(
      mergeLineRanges([
        { start: 0, end: 9 },
        { start: 3, end: 4 },
      ]),
    ).toEqual([{ start: 0, end: 9 }]);
  });

  test("does not mutate the input", () => {
    const input = [
      { start: 2, end: 5 },
      { start: 0, end: 3 },
    ];
    mergeLineRanges(input);
    expect(input).toEqual([
      { start: 2, end: 5 },
      { start: 0, end: 3 },
    ]);
  });
});
