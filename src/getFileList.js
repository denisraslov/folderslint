const fs = require("fs");
const glob = require("glob");
const argv = require("minimist")(process.argv.slice(2));
const posixSeparatedCwd = require("./posixSeparatedCwd");

const isDirSync = (pathName) =>
  fs.existsSync(pathName) && fs.lstatSync(pathName).isDirectory();

const getFileList = (
  inputFiles = [],
  { include = "**/*", cwd = posixSeparatedCwd() } = {}
) => {
  if (inputFiles.length === 0) {
    return glob.sync(include, {
      cwd,
      absolute: true,
    });
  }
  if (inputFiles.length === 1 && isDirSync(inputFiles[0])) {
    return getFileList([], { include, cwd: inputFiles[0] });
  }
  return inputFiles;
};

module.exports = () => getFileList(argv._);
