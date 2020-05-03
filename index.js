#!/usr/bin/env node

const parseConfig = require("./src/parseConfig");
const getFileList = require("./src/getFileList");
const { getExtendedRules } = require("./src/rules");
const checkDirectories = require("./src/checkDirectories");

const filePaths = getFileList();

const main = () => {
  const { root, rules } = parseConfig();
  const extendedRules = getExtendedRules(root, rules);

  checkDirectories(filePaths, extendedRules);
};

if (filePaths.length) {
  main();
}
