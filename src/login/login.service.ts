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
    // 这里应该联合查询，因为需要返回信息
    const user = await this.userPassword.findOne({
      where: { staffId: HashPassword.staffId },
    });
    const verify = HashPassword.toVerify == user.hashPassword;
    if (verify) {
      // this.userPassword.update(user.id, HashPassword);
      // TODO 返回一个Token
      const payload = { ...user };
      
      return {
        staffId: user.staffId,
        Token: this.jwtService.sign(payload),
      };
    }
  }
}
