import chalk from 'chalk';
import ora from 'ora';
import { toSecond } from '../../utils/string-utils';
import { fetchDatabase } from './fetch-database';

(function fetchVtubers() {
  const start = process.hrtime();
  const spinner = ora(`${chalk.yellowBright('Fetching all data...')}`).start();

  fetchDatabase()
    .then(() => {
      const end = `${toSecond(process.hrtime(start))} seconds`;
      spinner.succeed(`Fetching vtubers database done in ${chalk.greenBright(end)}`);
    })
    .catch(err => {
      chalk.red(err);
    });
})();
