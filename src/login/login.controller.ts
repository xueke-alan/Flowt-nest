import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // TODO 登录接口需要提供的api：
  // 预先密码
  @Post('preLogin/:staffId')
  preLogin(@Param('staffId') staffId: string) {


    return this.loginService.preLogin(staffId);
  }

  @Post()
  // TODO 类型
  login(@Body() HashPassword: any) {
    return this.loginService.login(HashPassword);
  }

  // 改密码邮件

  // 改密码
}
