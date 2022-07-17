#!/usr/bin/env node

const getFileList = require('./src/getFileList')
const runLinter = require('./src/runLinter')

const filePaths = getFileList()

if (filePaths.length) {
  runLinter(filePaths)
}
