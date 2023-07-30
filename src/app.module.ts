import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBconfig } from './DBconfig/DBconfig.psw';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      retryDelay: 500,
      retryAttempts: 3,
      autoLoadEntities: true,
      synchronize: true,
      ...DBconfig,
    }),


    UsersModule,
    LoginModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
