import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from 'src/entities/shared.module';
import { ConfigService } from '@nestjs/config';

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
export class LoginModule {
  constructor(private readonly configService: ConfigService) {}
}
