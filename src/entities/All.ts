import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 引入全部实体
import { MicoRouter } from './MicoRouter';
import { MicoRouterGroup } from './MicoRouterGroup';
import { MicoRouterRole } from './MicoRouterRole';
import { Permission } from './Permission';
import { Role } from './Role';
import { RolePermission } from './RolePermission';
import { User } from './User';
import { UserGroup } from './UserGroup';
import { UserPassword } from './UserPassword';
import { UserRole } from './UserRole';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MicoRouter,
      MicoRouterGroup,
      MicoRouterRole,
      Permission,
      Role,
      RolePermission,
      User,
      UserGroup,
      UserPassword,
      UserRole,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class SharedModule {}
