import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { DBconfig } from './DBconfig/DBconfig.psw';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './entities/All';
import { MicoRouterModule } from './mico-router/mico-router.module';
import { quoteModule } from './quote/quote.module';
import databaseConfig from './common/config/database.config';
import jwtConfig from './common/config/jwt.config.';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true, 
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      retryDelay: 500,
      retryAttempts: 3,
      autoLoadEntities: true,
      // synchronize: true, 
      ...databaseConfig(),
    }),
    UsersModule,
    LoginModule, 
    SharedModule,

    MicoRouterModule,

    quoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
