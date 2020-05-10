const { readFileSync } = require('fs');

const CONFIG_PATH = '.folderslintrc';

const parseConfig = () => {
  try {
    const config = readFileSync(CONFIG_PATH, 'utf8');
    return JSON.parse(config);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = parseConfig;
