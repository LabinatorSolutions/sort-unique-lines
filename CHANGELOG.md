# Changelog

## 1.2.0

- Change: minimum VS Code raised to 1.130
- Add: multi-cursor support — each selection is sorted independently; overlapping selections are merged
- Add: settings are `language-overridable`, so sort behaviour can differ per language
- Perf: comparison keys are computed once per line instead of on every comparator call
- Fix: no edit is applied when the result is identical, so the file is no longer marked dirty and the undo stack stays clean
- Build: `.github/`, `.directory`, and source maps are no longer shipped inside the `.vsix`

## 1.1.2

- Docs: add Credits section (publisher + tooling)

## 1.1.1

- Docs: badges in README now link to their respective sites/listing instead of being static images

## 1.1.0

- Fix: `removeBlankLines` now strips whitespace-only lines even when `trimLines` is disabled
- Change: default keybinding moved from `F9` (conflicts with debug toggle-breakpoint) to `Alt+W`
- Remove: redundant `activationEvents` (VS Code auto-generates from command contributions)
- Add: unit tests for sort/dedupe logic, CI workflow

## 1.0.0

- Initial release
- Sort lines ascending/descending
- Remove duplicate lines
- Trim whitespace (configurable)
- Strip blank lines (configurable)
- Case-insensitive dedup by default
- Works on selection or entire file
