import { Controller, Inject, Get, Param } from '@nestjs/common';
import { RbacService } from './rbac.service';

@Controller('rbac')
export class RbacController {
  constructor(
    @Inject('RbacService') private readonly rbacService: RbacService,
    @Inject('userList') private readonly users: string[],
    @Inject('userFn') private readonly userFn: any,
  ) {}

  @Get('test')
  test() {
    return this.userFn;
  }

  @Get('addUsers')
  addUsers() {
    return this.rbacService.addUsers();
  }

  @Get('delUsers/:id')
  delUsers(@Param() param: any): Promise<any> {
    let id: number = parseInt(param.id);
    return this.rbacService.delUsers(id);
  }

  @Get('updataUsers/:id')
  updataUsers(@Param() param: any): Promise<any> {
    let id: number = parseInt(param.id);
    return this.rbacService.updataUsers(id);
  }

  @Get('getUsers')
  getUsers(): Promise<any> {
    return this.rbacService.getUsers();
  }

  @Get('getUsersByName/:name')
  getUsersByName(@Param() param: any): Promise<any> {
    let name = param.name;
    return this.rbacService.getUsersByName(name);
  }
}
