# Changelog

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
