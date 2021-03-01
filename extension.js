// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // context.subscriptions.push(
  //   vscode.workspace.registerFileSystemProvider("playground", "file", {
  //     isCaseSensitive: true
  //   })
  // );

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

  let createScurry = vscode.commands.registerCommand(
    "js-scurry.createScurry",
    async () => {
      try {
        const name = await vscode.window.showInputBox({
          placeHolder: "Enter project name",
        });

        const location = await vscode.workspace
          .getConfiguration("jsScurry")
          .get("scurriesLocation");

        if (name) {
          const destDir = path.join(location, name);
          // create project
          fs.mkdirSync(destDir);

          // copy template/node --> project directory
          fse.copySync(path.join(__dirname, "templates/node"), destDir);

          const uri = vscode.Uri.file(destDir);

          // await vscode.commands.executeCommand("vscode.setEditorLayout", {
          //   orientation: 1,
          //   groups: [{ groups: [{}, {}], size: 0.5 }]
          // });

          const terminal = await vscode.window.createTerminal({
            name: "js-playground",
            cwd: destDir,
          });

          terminal.show();
          terminal.sendText("npm install && nodemon index.js");

          vscode.workspace.updateWorkspaceFolders(
            vscode.workspace.workspaceFolders
              ? vscode.workspace.workspaceFolders.length
              : 0,
            null,
            {
              uri,
              name,
            }
          );

          const doc = await vscode.workspace.openTextDocument(
            vscode.Uri.file(path.join(destDir, "index.js"))
          );

          await vscode.window.showTextDocument(doc);

          vscode.window.showInformationMessage(`Entered name is ${name}`);
        }
      } catch (err) {
        console.log({ err });
      }
    }
  );

  let installDep = vscode.commands.registerCommand(
    "js-scurry.installDependency",
    async () => {
      try {
        const name = await vscode.window.showInputBox({
          placeHolder: "Enter project name",
        });

        const terminal = await vscode.window.createTerminal({
          name: "js-playground"
        });

        terminal.sendText(`npm install ${name}`);
      } catch (err) {
        console.log({ err });
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(createScurry);
  context.subscriptions.push(installDep);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
