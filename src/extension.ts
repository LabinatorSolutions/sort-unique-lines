import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("sort-unique-lines.run", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const config = vscode.workspace.getConfiguration("sort-unique-lines");
    const sortOrder = config.get<string>("sortOrder", "ascending");
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
    let lines = text.split(/\r?\n/);

    if (trimLines) {
      lines = lines.map((l) => l.trim());
    }

    if (removeBlankLines) {
      lines = lines.filter((l) => l.length > 0);
    }

    const cmp = (a: string, b: string): number => {
      const ca = caseSensitive ? a : a.toLowerCase();
      const cb = caseSensitive ? b : b.toLowerCase();
      if (ca < cb) {
        return -1;
      }
      if (ca > cb) {
        return 1;
      }
      return 0;
    };

    lines.sort((a, b) => (sortOrder === "descending" ? cmp(b, a) : cmp(a, b)));

    const unique: string[] = [];
    for (const line of lines) {
      if (unique.length === 0) {
        unique.push(line);
        continue;
      }
      const last = unique[unique.length - 1];
      const same = caseSensitive ? last === line : last.toLowerCase() === line.toLowerCase();
      if (!same) {
        unique.push(line);
      }
    }

    const result = unique.join(eol);

    return editor.edit((editBuilder) => {
      editBuilder.replace(range, result);
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
