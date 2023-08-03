import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 引入全部实体
import { User } from './User';
import { UserGroup } from './UserGroup';
import { UserPassword } from './UserPassword';
import { UserRole } from './UserRole';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserGroup, UserPassword, UserRole]),
  ],
  exports: [TypeOrmModule], // 导出 TypeOrmModule，使其他模块可以使用
})
export class SharedModule {}
