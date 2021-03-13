const { window } = require("vscode");
const { readdirSync } = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const { getLocationConfig } = require("./setLocation");

const deletePlayground = async () => {
  try {
    const location = await getLocationConfig();

    const playgrounds = readdirSync(location);

    const selected = await window.showQuickPick(playgrounds, {
      placeHolder: "Select playground to delete",
    });

    if (selected) {
      const destDir = path.join(location, selected);

      rimraf.sync(destDir);

      window.showInformationMessage("Playground deleted successfully!");
    }
  } catch (err) {
    console.log({ err });
    window.showErrorMessage("Something went wrong.");
  }
};

module.exports = deletePlayground;
