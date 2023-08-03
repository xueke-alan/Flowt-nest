import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { UserGroup } from '../entities/UserGroup';
import { UserPassword } from '../entities/UserPassword';
import { UserRole } from '../entities/UserRole';
import { SharedModule } from 'src/entities/shared.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User, UserGroup, UserPassword, UserRole]),
    SharedModule, // 导入共享模块
    ConfigModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
