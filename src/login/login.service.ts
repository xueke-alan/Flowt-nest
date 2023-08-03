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

  async preLogin(staffId: string) {
    // 只查询salt，saltRounds，validUntil
    const user = await this.userPassword.findOne({ where: { staffId } });
    if (user) {
      return user;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: '账号有误',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
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

      // 这里应该校验是否HashPassword.toUpdate一致，理论上是不用的因为前端的算法没问题就没问题，
      // 但是防止api调用方式，所以要验证，或者禁止api调用，或者当prelogin的时候发送一个token，
      // token有效期只有3s，通过这个token验证

      this.userPassword.update(user_Password.id, HashPassword.toUpdate);

      const payload = { staffId: user.staffId, usernameCn: user.usernameCn };

      // 这里不需要返回全部信息，返回payload即可
      return {
        ...payload,
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
