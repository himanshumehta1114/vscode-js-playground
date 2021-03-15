const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const { window, workspace, commands, Uri } = require("vscode");
const { setLocationCmd } = require("./setLocation");

const createPlayground = async () => {
  try {
    const name = await window.showInputBox({
      placeHolder: "Enter project name",
    });

    const location = await workspace
      .getConfiguration("jsPlayground")
      .get("location");

    if (!location) {
      const res = await window.showErrorMessage(
        `Set valid location before creating playground.`,
        { title: "Set location" }
      );

      if (res.title) {
        await setLocationCmd();
      }

      return;
    }

    if (name) {
      const destDir = path.join(location, name);

      if (fs.existsSync(destDir)) {
        window.showErrorMessage(
          `Playground exists, please choose different name.`
        );
        return;
      }

      // create project
      fs.mkdirSync(destDir);

      // copy template/node --> project directory
      fse.copySync(path.join(__dirname, "../templates/node"), destDir);

      const uri = Uri.file(destDir);

      await commands.executeCommand("vscode.openFolder", uri, {
        forceNewWindow: true,
      });
    }
  } catch (err) {
    window.showInformationMessage(`Something went wrong!`);
  }
};

module.exports = createPlayground;
