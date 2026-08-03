import * as vscode from "vscode";
import { sortUniqueLines } from "./sortLines";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("sort-unique-lines.run", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const config = vscode.workspace.getConfiguration("sort-unique-lines");
    const sortOrder = config.get<"ascending" | "descending">("sortOrder", "ascending");
    const caseSensitive = config.get<boolean>("caseSensitive", false);
    const removeBlankLines = config.get<boolean>("removeBlankLines", true);
    const trimLines = config.get<boolean>("trimLines", true);

    const document = editor.document;
    const selection = editor.selection;

    let startLine: number;
    let endLine: number;

    if (selection.isEmpty) {
      startLine = 0;
      endLine = document.lineCount - 1;
    } else {
      startLine = selection.start.line;
      endLine = selection.end.line;
      if (selection.end.character === 0 && endLine > startLine) {
        endLine--;
      }
    }

    const lastLine = document.lineAt(endLine);
    const range = new vscode.Range(startLine, 0, endLine, lastLine.text.length);

    const text = document.getText(range);
    const eol = document.eol === vscode.EndOfLine.CRLF ? "\r\n" : "\n";

    const result = sortUniqueLines(text, eol, {
      sortOrder,
      caseSensitive,
      removeBlankLines,
      trimLines,
    });

    return editor.edit((editBuilder) => {
      editBuilder.replace(range, result);
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
