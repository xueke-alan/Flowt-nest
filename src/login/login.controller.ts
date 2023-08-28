import { Controller, Post, Body, Param, UseInterceptors } from '@nestjs/common';
import { LoginService } from './login.service';
import { DomainMiddleware } from 'src/common/middleware/domain/domain.middleware';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // 预登录，获取盐与迭代次数
  @Post('preLogin/:staffId')
  @UseInterceptors(DomainMiddleware) // 使用 @UseInterceptors() 装饰器
  preLogin(@Param('staffId') staffId: string) {
    return this.loginService.preLogin(staffId);
  }

  @Post()
  // TODO DTO层 类型
  login(@Body() HashPassword: any) {
    return this.loginService.login(HashPassword);
  }

  // 改密码邮件

  // 改密码
}
