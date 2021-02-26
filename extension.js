// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "js-scurry" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "js-scurry.setLocation",
    async () => {
      try {
        // The code you place here will be executed every time your command is executed
        /**
         * @todo
         *
         * check is no directory selected, give user option to set one
         */
        const dir = await vscode.window.showOpenDialog({
          canSelectFiles: false,
          canSelectFolders: true,
          canSelectMany: false,
        });

        const location = dir[0].path;

        if (location) {
          vscode.window.showInformationMessage(
            `Selected location : ${location}`
          );
        }

        await vscode.workspace
          .getConfiguration("jsScurry")
          .update("scurriesLocation", location, true);
      } catch (err) {
        console.log({ err });
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
