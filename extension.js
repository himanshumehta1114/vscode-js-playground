const vscode = require("vscode");

const { setLocationCmd } = require("./commands/setLocation");
const createPlayground = require("./commands/createPlayground");

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

  context.subscriptions.push(_setLocation);
  context.subscriptions.push(_createPlayground);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
