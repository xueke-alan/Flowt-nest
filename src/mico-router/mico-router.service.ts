import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MicoRouter } from '../entities/MicoRouter';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class MicoRouterService {
  constructor(
    @InjectRepository(MicoRouter)
    private readonly MicoRouter: Repository<MicoRouter>,
  ) {}

  async findAll({ role }) {
    // 定义别名
    const routerAlias = 'router';
    const routerGroupAlias = 'routerGroup';
    // 根据角色筛选查询对应的路由表
    const ORI = await this.MicoRouter.createQueryBuilder(routerAlias)
      .innerJoin(`${routerAlias}.micoRouterRoles`, 'routerRole')
      .andWhere('routerRole.role IN (:...roles)', { roles: role })
      .leftJoinAndSelect(`${routerAlias}.group2`, routerGroupAlias)
      .orderBy(`${routerGroupAlias}.sort`, 'ASC') // 根据group的sort字段升序排序
      .addOrderBy(`${routerAlias}.sort`, 'ASC')
      .select(`${routerAlias}.*`)
      // .addSelect(`${routerGroupAlias}.description AS groupDescription`)
      .getRawMany();

    // 提取排序后的group字段列表
    const sortedGroupList = [...new Set(ORI.map((i) => i.group))];

    return { sortedGroupList, micoRouterListOri: ORI };
  }

  async getMicroConfigList() {
    try {
      // 这里的地址是服务器打开的地址，用于遍历微应用文件夹下有哪些微应用
      const response = await axios.get('http://127.0.0.1:9999'); // 发送 GET 请求
      const temp = response.data;
      const list = {};
      temp.forEach((t) => {
        list[t.baseUrl] = t;
      });
      return list; // 返回响应数据
    } catch (error) {
      // 处理错误
      throw new Error('无法获取配置列表');
    }
  }
}
