const chalk = require('chalk');

const ERROR_MESSAGE = 'Directory is not allowed by config';
const SUCCESS_MESSAGE = '✅ All checked directories are allowed by config';

const logError = (path) => {
  console.log(chalk.underline(path));
  console.log(`${chalk.red('error')}  ${ERROR_MESSAGE}`);
};

const logErrorsStats = (errorPathes) => {
  console.log('');
  console.log(`folderslint: ${errorPathes.length} error(s) found`);
};

const logSuccess = () => {
  console.log(SUCCESS_MESSAGE);
};

module.exports = { logError, logErrorsStats, logSuccess };
