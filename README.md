# Sort & Unique Lines

A **VS Code extension** that sorts and removes duplicate lines instantly. Select specific lines or leave unselected to process the entire file, then press F9.

![Package mgr · Bun](https://www.shieldcn.dev/badge/Package_mgr-Bun-000000.svg?logo=bun&variant=branded&mode=light&font=jetbrains-mono)
![Language · TypeScript](https://www.shieldcn.dev/badge/Language-TypeScript-3178C6.svg?logo=typescript&variant=branded&mode=light&font=jetbrains-mono)
![Lint · Biome](https://www.shieldcn.dev/badge/Lint-Biome-60A5FA.svg?logo=biome&variant=branded&mode=light&font=jetbrains-mono)
![VS Code Marketplace](https://www.shieldcn.dev/badge/VS_Code-Marketplace-1e1e1e.svg?logo=visualstudio&variant=branded&mode=light&font=jetbrains-mono)

---

## Installation

### From Marketplace

**[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Labinator.sort-unique-lines)**

Or search "Sort & Unique Lines" in the Extensions view (`Ctrl+Shift+X`).

### From VSIX

Download the `.vsix` file from [releases](https://github.com/LabinatorSolutions/sort-unique-lines/releases), then:

```bash
code --install-extension sort-unique-lines-1.0.0.vsix
```

### From Source

```bash
git clone https://github.com/LabinatorSolutions/sort-unique-lines.git
cd sort-unique-lines
bun install
bun run compile
bun run package
code --install-extension sort-unique-lines-*.vsix
```

---

## Usage

1. Select lines in any editor (or select nothing to process the entire file)
2. Press **F9**
3. The selection is replaced with sorted, deduplicated lines
4. Undo with `Ctrl+Z` as usual

---

## Features

- Sorts lines ascending or descending
- Removes duplicate lines (case-insensitive dedup by default)
- Trims leading/trailing whitespace (configurable)
- Strips blank lines (configurable)
- Case-sensitive mode available
- Works on selection or the entire file
- Zero runtime dependencies

---

## Configuration

All settings live under **File > Preferences > Settings** → search "Sort & Unique Lines".

| Setting | Type | Default | Description |
| --- | --- | --- | --- |
| `sort-unique-lines.sortOrder` | `"ascending"` \| `"descending"` | `"ascending"` | Sort direction |
| `sort-unique-lines.caseSensitive` | `boolean` | `false` | Treat uppercase/lowercase as different |
| `sort-unique-lines.removeBlankLines` | `boolean` | `true` | Strip empty and whitespace-only lines |
| `sort-unique-lines.trimLines` | `boolean` | `true` | Trim whitespace from each line before sorting |

---

## Keybinding

Default: **`F9`**  
Change it in **File > Preferences > Keyboard Shortcuts** → search "Sort & Unique Lines".

---

## Development

```bash
bun install          # install dependencies
bun run compile      # compile TypeScript → out/
bun run lint         # lint with Biome
bun run format       # format with Biome
bun run package      # build .vsix
```

Requires [Bun](https://bun.sh) and [VS Code](https://code.visualstudio.com) 1.125+.

Built with Bun + TypeScript + Biome. Zero runtime dependencies.

---

## License

[AGPL-3.0](LICENSE)
