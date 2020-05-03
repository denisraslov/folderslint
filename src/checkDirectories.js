const { lstatSync } = require("fs");
const { checkPath } = require("./rules");
const logError = require("./logError");

const checkDirectories = (filePaths, rules) => {
  let areAllPathesPermitted = true;

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

    isPathPermitted = checkPath(pathToCheck, rules);
    if (!isPathPermitted) {
      logError(pathToCheck);
    }
    areAllPathesPermitted = areAllPathesPermitted && isPathPermitted;
  });

  if (!areAllPathesPermitted) {
    process.exit(1);
  }
};

module.exports = checkDirectories;
