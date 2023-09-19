import { Module } from '@nestjs/common';
import { quoteService } from './quote.service';
import { quoteController } from './quote.controller';

@Module({
  controllers: [quoteController],
  providers: [quoteService]
})
export class quoteModule {}
