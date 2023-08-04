import { HttpException, HttpStatus, Injectable   } from '@nestjs/common';
import { UserPassword } from '../entities/UserPassword';
import { User } from '../entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

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
    const user = await this.userPassword.findOne({
      where: { staffId },
      select: ['salt', 'saltRounds', 'validUntil'],
    });
    if (user) {
      return {
        ...user,
        preToken: this.jwtService.sign({ ...user }, { expiresIn: '3s' }),
      };
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

  async login(HashPassword) {
    const decodedToken = this.jwtService.decode(HashPassword.preToken);
    // 超时验证，防止有人伪造prelogin
    if (Date.now() - decodedToken['exp'] * 1000 > 0) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: '非法访问或访问超时',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // 联合查询，需要返回信息
    const user = await this.User.findOne({
      where: { staffId: HashPassword.staffId },
      relations: ['userPasswords'],
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: '账号有误',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 获取联合查询的userPasswords关系表信息
    const user_Password = user.userPasswords[0];
    if (!user_Password) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: '账号有误',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 验证一致性
    const verify = HashPassword.toVerify === user_Password.hashPassword;

    if (verify) {
      // 重置盐值，迭代次数，hash密码
      this.userPassword.update(user_Password.id, HashPassword.toUpdate);
      // 传回基本信息
      const payload = { staffId: user.staffId, usernameCn: user.usernameCn };
      return {
        ...user,
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
