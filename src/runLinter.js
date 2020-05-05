const parseConfig = require('./parseConfig');
const { getExtendedRules } = require('./rules');
const checkDirectories = require('./checkDirectories');
const logError = require('./logError');

const logErrors = (errorPathes) => {
  errorPathes.forEach((path) => logError(path));
};

const runLinter = (filePaths) => {
  const { root, rules } = parseConfig();
  const extendedRules = getExtendedRules(root, rules);

  const errorPathes = checkDirectories(filePaths, extendedRules);

  if (errorPathes.length) {
    logErrors(errorPathes);
    process.exit(1);
  }
};

module.exports = runLinter;
