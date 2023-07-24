import { Module } from '@nestjs/common';
import { RbacService } from './rbac_.service';
import { RbacController } from './rbac_.controller';

@Module({
  controllers: [RbacController],
  providers: [RbacService]
})
export class RbacModule {}
