import chalk from 'chalk';
import ora from 'ora';
import { toSecond } from '../../utils/string-utils';
import { fetchDatabase } from './fetch-database';

// Google spreadsheet fetching logic "inspired" by WargaBantuWarga project:
// https://github.com/kawalcovid19/wargabantuwarga.com/tree/main/etc/fetchers

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
