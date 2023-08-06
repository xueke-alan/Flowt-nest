import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from 'src/entities/All';
import { ConfigService } from '@nestjs/config';
import { DomainMiddleware } from 'src/common/middleware/domain/domain.middleware';

@Module({
  imports: [
    SharedModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: '168h', algorithm: 'HS256' },
        verifyOptions: { ignoreExpiration: false, algorithms: ['HS256'] },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DomainMiddleware).forRoutes('login'); // 指定要拦截的路由
  }
}
