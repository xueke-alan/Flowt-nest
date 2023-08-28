import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/entities/All';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SharedModule, // 导入共享模块
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
