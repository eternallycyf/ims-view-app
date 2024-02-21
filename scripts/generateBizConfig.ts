import chalk from 'chalk';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = new URL('.', import.meta.url).pathname;

type IBusinessList = Array<{ name: string; path: string }>;
function getAllBiz(source: string): IBusinessList {
  if (!fs.existsSync(source)) {
    console.log(chalk.yellow(`目录不存在${source}`));
    return [];
  }
  const folders: Array<string> = fs.readdirSync(source);
  const bizList: IBusinessList = [];
  folders.forEach((item) => {
    const itemPath = path.resolve(__dirname, `../src/business/views/${item}/`);
    bizList.push({
      name: item,
      path: itemPath,
    });
  });
  return bizList;
}
const targetFile: string = path.resolve(__dirname, '../src/routes/business.ts');
const bizPath: string = path.resolve(__dirname, '../src/business/views');
const templatePath: string = path.resolve(
  __dirname,
  './biz-stage-config.ts.ejs',
);

console.log(chalk.green(`配置插件...`));

const template = fs.readFileSync(templatePath, 'utf8');
const bizList: IBusinessList = getAllBiz(bizPath);
const result = ejs.render(template, { plugins: bizList });

fs.writeFile(targetFile, result, (err) => {
  if (err) {
    console.error('write file error', err);
  } else {
    console.log(chalk.green(`配置插件完成: ${targetFile}\n`));
  }
});
