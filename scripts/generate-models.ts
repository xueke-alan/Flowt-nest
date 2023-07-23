import { exec } from 'child_process';
import * as path from 'path';

import { DBconfig } from '../src/DBconfig/DBconfig.psw';

const H = DBconfig.host;
const P = DBconfig.port;
const user = DBconfig.username;
const PSW = DBconfig.password;
const DB = DBconfig.database;
const T = 'mysql';

const O = path.join(__dirname, '..', 'src', 'entities');

const command = `rm -rf ${O} & typeorm-model-generator --noConfig true -h ${H} -d ${DB} -p ${P} -u ${user} -x ${PSW} -e ${T} -o ${O}`;
console.log(command);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error occurred: ${error.message}`);
    console.error(error.message);
    return;
  }
  console.log(stdout);
});
