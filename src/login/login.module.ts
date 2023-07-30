import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { User } from '../entities/User';
import { UserGroup } from '../entities/UserGroup';
import { UserPassword } from '../entities/UserPassword';
import { UserRole } from '../entities/UserRole';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // 导入 JwtModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserGroup, UserPassword, UserRole]),
    JwtModule.register({
      secret: 'your_secret_key_here',
      signOptions: { expiresIn: '168h', algorithm: 'HS256' },
      verifyOptions: { ignoreExpiration: false, algorithms: ['HS256'] },
    }), // 注册 JwtModule
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
