const { lstatSync } = require("fs");
const { checkPath } = require("./rules");

const checkDirectories = (filePaths, rules) => {
  const errorPathes = [];

  filePaths.forEach((path) => {
    const isDirectory = lstatSync(path).isDirectory();
    let pathToCheck;

    if (isDirectory) {
      pathToCheck = path;
    } else {
      const splittedPath = path.split("/");
      splittedPath.pop();
      const directoryPath = splittedPath.join("/");
      pathToCheck = directoryPath;
    }

    if (!checkPath(pathToCheck, rules) && !errorPathes.includes(pathToCheck)) {
      errorPathes.push(pathToCheck);
    }
  });

  return errorPathes;
};

module.exports = checkDirectories;
