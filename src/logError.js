const chalk = require('chalk');

const ERROR_MESSAGE = 'Directory is not allowed by config';

const logError = (path) => {
  console.log(chalk.underline(path));
  console.log(`${chalk.red('error')}  ${ERROR_MESSAGE}`);
};

module.exports = logError;
