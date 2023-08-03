import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBconfig } from './DBconfig/DBconfig.psw';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './entities/shared.module';

import databaseConfig from './common/config/database.config';
import jwtConfig from './common/config/jwt.config.';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      retryDelay: 500,
      retryAttempts: 3,
      autoLoadEntities: true,
      // synchronize: true,
      ...DBconfig,
    }),

    UsersModule,
    LoginModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [databaseConfig, jwtConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
