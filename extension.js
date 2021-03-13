const vscode = require("vscode");

const { setLocationCmd } = require("./commands/setLocation");
const createPlayground = require("./commands/createPlayground");
const openPlaygroundCmd = require("./commands/openPlayground");
const deletePlaygroundCmd = require("./commands/deletePlayground");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const _setLocation = vscode.commands.registerCommand(
    "js-playground.setLocation",
    setLocationCmd
  );

  const _createPlayground = vscode.commands.registerCommand(
    "js-playground.createPlayground",
    createPlayground
  );

  const _openPlayground = vscode.commands.registerCommand(
    "js-playground.openPlayground",
    openPlaygroundCmd
  );

  const _deletePlayground = vscode.commands.registerCommand(
    "js-playground.deletePlayground",
    deletePlaygroundCmd
  );

  context.subscriptions.push(_setLocation);
  context.subscriptions.push(_createPlayground);
  context.subscriptions.push(_openPlayground);
  context.subscriptions.push(_deletePlayground);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
