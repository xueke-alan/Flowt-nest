// rbac.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  addUsers() {
    // 在这里你可以添加额外的逻辑，如果需要查询用户关联的其他数据也可以在这里处理
    // 例如，如果你想要加载用户的UserGroups和UserPassword关联关系，可以使用find()方法进行关联查询
    const data = new User();
    data.id = '2';
    data.staffId = 'GZ10255';
    data.username = '薛科2';
    data.usernameCn = '薛科2';
    data.usernameGpo = '薛科2';
    data.avatar = '222';
    data.email = '222@sgs.com';

    return this.user.save(data);
  }

  delUsers(id: number) {
    return this.user.delete(id);
  }

  updataUsers(id: number) {
    const data = new User();
    data.username = '薛科222';
    return this.user.update(id, data);
  }

  getUsers() {
    return this.user.find();
  }

  getUsersByName(username: string) {
    return this.user.find({
      where: {
        username: Like(`%${username}`),
      },
    });
  }
}
