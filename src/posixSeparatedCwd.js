const path = require('path')

module.exports = function posixSeparatedCwd() {
  return process.cwd().split(path.sep).join(path.posix.sep)
}
