import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    await this.user.save(createUserDto);
    return 'success 一行记录被添加';
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
