import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { UserGroup } from '../entities/UserGroup';
import { UserPassword } from '../entities/UserPassword';
import { UserRole } from '../entities/UserRole';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserGroup, UserPassword, UserRole]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
