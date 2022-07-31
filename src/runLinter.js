const { parseConfig } = require('./parseConfig')
const { getExtendedRules } = require('./rules')
const checkDirectories = require('./checkDirectories')
const { logError, logErrorsStats, logSuccess } = require('./loggers')

const logErrors = (errorPathes) => {
  errorPathes.forEach((path) => logError(path))
}

const runLinter = (filePaths) => {
  const { root, rules } = parseConfig()
  const { rules: extendedRules, root: extendedRoot } = getExtendedRules(
    root,
    rules
  )

  const errorPathes = checkDirectories(filePaths, extendedRules, extendedRoot)

  if (errorPathes.length) {
    logErrors(errorPathes)
    logErrorsStats(errorPathes)
    process.exit(1)
  } else {
    logSuccess()
  }
}

module.exports = runLinter
