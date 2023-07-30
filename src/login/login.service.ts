import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { UserPassword } from '../entities/UserPassword';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserPassword)
    private readonly userPassword: Repository<UserPassword>,
    private readonly jwtService: JwtService,
  ) {}

  preLogin(staffId: string) {
    console.log(staffId);
    // 只查询salt，saltRounds，validUntil
    return this.userPassword.findOne({ where: { staffId } });
  }

  // 改名字为validateUser??
  async login(HashPassword) {
    console.log(HashPassword);
    const user = await this.userPassword.findOne({
      where: { staffId: HashPassword.staffId },
    });
    const verify = HashPassword.toVerify == user.hashPassword;
    if (verify) {
      this.userPassword.update(user.id, HashPassword);
      // TODO 返回一个Token
      const payload = { sub: 1, iss: 1, aud: 1, exp: 1, iat: 1, nbf: 1 };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } 
  }

  create(createLoginDto: CreateLoginDto) {
    return 'This action adds a new login';
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
