import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.user.save(createUserDto);
  }

  // TODO: 可以加验证器
  findAll(query: any) {
    // TODO 分页查询
    return this.user.find();
  }

  async findOne(id: number) {
    const user = await this.user.findOne({
      where: { id },
      relations: ['userGroups', 'userPasswords', 'userRoles'], // 在这里指定要加载的关联实体，这里使用userGroups作为关联字段名
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.user.findOne({ where: { id } });

    if (!existingUser) {
      return 'User not found';
    }

    // Object.assign(existingUser, updateUserDto);

    // return this.user.save(existingUser);
    // TODO 由于外键存在，可能会报错，需要加全局错误
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }

  getInfo() {
    const info = {
      staffId: 'GZ10548',
      Username: 'Alan xue',
      usernameCn: '薛科',
      UsernameGPO: 'Alan_xue',
      Avatar:
        'https://res.cloudinary.com/postman/image/upload/t_team_logo/v1685442616/team/816e81aa01116ed74f82a7d65a5dd84c8f92add9fc3b6e867945873d3dbbf2f9.jpg',
      Email: 'manager',
      State: '1',
      Token: '',
      permissions: [
        {
          label: '主控台',
          value: 'dashboard_console',
        },
        {
          label: '监控页',
          value: 'dashboard_monitor',
        },
        {
          label: '工作台',
          value: 'dashboard_workplace',
        },
        {
          label: '基础列表',
          value: 'basic_list',
        },
        {
          label: '基础列表删除',
          value: 'basic_list_delete',
        },
      ],
    };

    return info;
  }
}
