// rbac.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RbacController } from './rbac.controller';
import { RbacService } from './rbac.service';
import { User } from '../entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RbacController],
  providers: [
    {
      provide: 'RbacService',
      useClass: RbacService,
    },
    {
      provide: 'userList',
      useValue: ['小红', '小兰'],
    },
    {
      provide: 'userFn',
      useFactory() {
        console.log('useFactory-------');
        return '打印 useFactory-------';
      },
    },
  ],
})
export class RbacModule {}
