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
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // TODO 登录接口需要提供的api：
  // 预先密码
  @Post('preLogin/:staffID')
  preLogin(@Param("staffID") staffID: string) {
    console.log(staffID);

    return this.loginService.preLogin(staffID);
  }

  @Post("login")
  // TODO 类型
  login(@Body() HashPassword: any) {
    return this.loginService.login(HashPassword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
