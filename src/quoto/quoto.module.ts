import { Module } from '@nestjs/common';
import { QuotoService } from './quoto.service';
import { QuotoController } from './quoto.controller';

@Module({
  controllers: [QuotoController],
  providers: [QuotoService]
})
export class QuotoModule {}
