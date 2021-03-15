const { window, commands, Uri } = require("vscode");
const { readdirSync } = require("fs");
const path = require("path");
const { getLocationConfig } = require("./setLocation");

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const openPlayground = async () => {
  const location = await getLocationConfig();

  const playgrounds = getDirectories(location);

  const selected = await window.showQuickPick(playgrounds, {
    placeHolder: "Select playground to open",
  });

  if (selected) {
    const destDir = path.join(location, selected);

    const uri = Uri.file(destDir);

    await commands.executeCommand("vscode.openFolder", uri, {
      forceNewWindow: true,
    });
  }
};

module.exports = openPlayground;
