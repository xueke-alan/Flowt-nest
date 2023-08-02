import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { UserPassword } from '../entities/UserPassword';
import { User } from '../entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { error, log } from 'console';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserPassword)
    private readonly userPassword: Repository<UserPassword>,
    @InjectRepository(User)
    private readonly User: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  preLogin(staffId: string) {
    // 只查询salt，saltRounds，validUntil
    return this.userPassword.findOne({ where: { staffId } });
  }

  // 改名字为validateUser??
  async login(HashPassword) {
    // 这里应该联合查询，因为需要返回信息

    const user = await this.User.findOne({
      where: { staffId: HashPassword.staffId },
      relations: ['userPasswords'],
    });
    const user_Password = user.userPasswords[0];

    // const verify = true;
    const verify = HashPassword.toVerify == user_Password.hashPassword;

    if (verify) {
      console.log(HashPassword);

      this.userPassword.update(user_Password.id, HashPassword.toUpdate);

      const payload = { staffId: user.staffId, usernameCn: user.usernameCn };

      return {
        staffId: user.staffId,
        usernameCn: user.usernameCn,
        token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: '账号或密码错误',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
