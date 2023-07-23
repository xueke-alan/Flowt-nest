/**
 * 数据库配置接口
 * @interface IDBconfig
 * @description 同目录下创建文件DBconfig.psw.ts，内容如示例代码
 * @example
 * import { IDBconfig } from './DBconfig.type';
 *
 * export const DBconfig: IDBconfig = {
 *   host: "localhost",
 *   port: 3306,
 *   username: "myuser",
 *   password: "mypassword",
 *   database: "mydatabase"
 * };
 */
export interface IDBconfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
