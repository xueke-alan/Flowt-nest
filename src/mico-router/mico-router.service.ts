import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MicoRouter } from '../entities/MicoRouter';
import { Repository } from 'typeorm';

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
}
