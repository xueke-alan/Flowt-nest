import { Module } from '@nestjs/common';
import { MicoRouterService } from './mico-router.service';
import { MicoRouterController } from './mico-router.controller';
import { SharedModule } from 'src/entities/All';

@Module({
  imports: [
    SharedModule, // 导入共享模块
  ],
  controllers: [MicoRouterController],
  providers: [MicoRouterService],
})
export class MicoRouterModule {}
