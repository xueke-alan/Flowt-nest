import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private configService: ConfigService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.user.save(createUserDto);
  }

  async findAll({ page = 1, pagesize = 15 }) {
    const users = await this.user.find({
      skip: (page - 1) * pagesize,
      take: pagesize,
    });
    const total = await this.user.count();

    return {
      users,
      page,
      pagesize,
      total,
    };
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

    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }

  async getInfo(staffId: string) {
    const user = await this.user.findOne({
      where: { staffId },
      relations: ['userGroups', 'userRoles'], // 在这里指定要加载的关联实体，这里使用userGroups作为关联字段名
    });

    const info = {
      ...user,

      role: user.userRoles.map((r: any) => r.role),
      permissions: [],
    };

    return info;
  }
}
