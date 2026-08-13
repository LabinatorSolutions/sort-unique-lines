import * as vscode from "vscode";
import { type LineRange, mergeLineRanges } from "./lineRanges";
import { sortUniqueLines } from "./sortLines";

function selectedLineRanges(editor: vscode.TextEditor): LineRange[] {
  const ranges: LineRange[] = [];

  for (const selection of editor.selections) {
    if (selection.isEmpty) {
      continue;
    }
    const start = selection.start.line;
    let end = selection.end.line;
    // A selection dragged to the start of the next line does not include that line.
    if (selection.end.character === 0 && end > start) {
      end--;
    }
    ranges.push({ start, end });
  }

  return mergeLineRanges(ranges);
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("sort-unique-lines.run", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const document = editor.document;
    const config = vscode.workspace.getConfiguration("sort-unique-lines", document);
    const options = {
      sortOrder: config.get<"ascending" | "descending">("sortOrder", "ascending"),
      caseSensitive: config.get<boolean>("caseSensitive", false),
      removeBlankLines: config.get<boolean>("removeBlankLines", true),
      trimLines: config.get<boolean>("trimLines", true),
    };

    const lineRanges = selectedLineRanges(editor);
    if (lineRanges.length === 0) {
      lineRanges.push({ start: 0, end: document.lineCount - 1 });
    }

    const eol = document.eol === vscode.EndOfLine.CRLF ? "\r\n" : "\n";

    const edits = lineRanges.map(({ start, end }) => {
      const range = new vscode.Range(start, 0, end, document.lineAt(end).text.length);
      const original = document.getText(range);
      return { range, original, sorted: sortUniqueLines(original, eol, options) };
    });

    // Skip the edit entirely when nothing moves, so the document is not marked
    // dirty and no empty entry lands on the undo stack.
    if (edits.every((edit) => edit.sorted === edit.original)) {
      return;
    }

    return editor.edit((editBuilder) => {
      for (const edit of edits) {
        editBuilder.replace(edit.range, edit.sorted);
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
