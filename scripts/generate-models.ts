import * as path from 'path';
import * as fs from 'fs-extra';
import { exec } from 'child_process';
const envConfig = parseEnvFile('.env');

async function main() {
  const start = Date.now();

  const HOST = envConfig['DATABASE_HOST'];
  const PORT = envConfig['DATABASE_PORT'];
  const USER = envConfig['DATABASE_USER'];
  const PSW = envConfig['DATABASE_PASSWORD'];
  const DB = envConfig['DATABASE_DBNAME'];
  const TYPE = 'mysql';
  const SHAREFILENAME = 'All.ts';
  const PATH = path.join(__dirname, '..', 'src', 'entities');

  // 清空文件夹
  deleteAndRecreateDirectory(PATH);

  // 创建模型实体
  const command = `typeorm-model-generator --noConfig true -h ${HOST} -d ${DB} -p ${PORT} -u ${USER} -x ${PSW} -e ${TYPE} -o ${PATH}`;
  await runCommand(command);

  // 创建shared.module.ts
  const files = fs.readdirSync(PATH);

  // 去除文件扩展符，生成新的文件名数组
  const entitiesList = files.map((file) => path.parse(file).name);
  const SharedModulePath = path.join(PATH, SHAREFILENAME);
  fs.writeFileSync(SharedModulePath, fileContent(entitiesList));

  // prettier美化文件
  await runCommand(`prettier --write ${SharedModulePath}`);

  console.log(`>>> 成功导入全部文件，总耗时：${Date.now() - start}ms`);
}

main();

async function runCommand(command: string) {
  console.log(command);
  return new Promise<void>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error occurred: ${error.message}`);
        console.error(error.message);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

function deleteAndRecreateDirectory(directoryPath: string): void {
  try {
    // 删除目录
    fs.removeSync(directoryPath);
    console.log(`目录 ${directoryPath} 删除成功！`);

    // 创建目录
    fs.mkdirSync(directoryPath);
    console.log(`目录 ${directoryPath} 重新创建成功！`);
  } catch (err) {
    console.error('操作出现错误：', err);
  }
}

function fileContent(E: string[]) {
  const importFrom = E.map((e: string) => `import { ${e} } from './${e}';`);
  const entities = E.map((e: string) => `${e},`);
  const content = [
    "import { Module } from '@nestjs/common';",
    "import { TypeOrmModule } from '@nestjs/typeorm';",
    '\n// 引入全部实体',
    ...importFrom,
    '\n@Module({imports: [TypeOrmModule.forFeature([',
    ...entities,
    '])],exports: [TypeOrmModule]})',
    'export class SharedModule {}',
  ];
  return content.join('\n');
}

function parseEnvFile(filepath) {
  const envData = fs.readFileSync(filepath, 'utf8');
  const lines = envData.split('\n');

  const envConfig = {};
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, value] = trimmedLine.split('=');
      envConfig[key.trim()] = value.trim();
    }
  }

  return envConfig;
}
