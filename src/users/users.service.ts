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
    console.log(createUserDto);
    return this.user.save(createUserDto);
  }

  // TODO: 可以加验证器
  findAll(query: any) {
    console.log(query);
    // TODO 分页查询
    return this.user.find();
  }

  findOne(id: number) {
    return this.user.find({ where: { id } });
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
}
