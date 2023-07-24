import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBconfig } from './DBconfig/DBconfig.psw';
import { RbacModule } from './rbac/rbac.module';
import { RbacModule } from './rbac_/rbac_.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      retryDelay: 500,
      retryAttempts: 3,
      synchronize: true,
      autoLoadEntities: true,
      ...DBconfig,
    }),
    RbacModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
