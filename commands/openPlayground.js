const { window, commands, Uri } = require("vscode");
const { readdirSync } = require("fs");
const path = require("path");
const { getLocationConfig } = require("./setLocation");
const { setLocationCmd } = require("./setLocation");

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const openPlayground = async () => {
  const location = await getLocationConfig();

  if (!location) {
    const res = await window.showErrorMessage(
      `Set valid location before creating playground.`,
      { title: "Set location" }
    );

    if (res.title) {
      await setLocationCmd();
    }

    return
  }

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
