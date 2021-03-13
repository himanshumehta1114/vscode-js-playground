const { window, workspace } = require("vscode");

const setLocationConfig = async (location) =>
  await workspace
    .getConfiguration("jsPlayground")
    .update("location", location, true);

const setLocationCmd = async () => {
  try {
    const dir = await window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
    });

    const location = dir[0].path;

    if (location) {
      window.showInformationMessage(`Selected location is ${location}`);
    }

    await setLocationConfig(location);
  } catch (err) {
    console.log({ err });
  }
};

module.exports = { setLocationCmd, setLocationConfig };
