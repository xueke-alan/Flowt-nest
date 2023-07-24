// rbac.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RbacController } from './rbac.controller';
import { RbacService } from './rbac.service';
import { User } from '../entities/User';
import { CounterMiddleware } from '../counter/counter.middleware';
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
export class RbacModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CounterMiddleware).forRoutes('rbac');
  }
}
