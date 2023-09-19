import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { quoteService } from './quote.service';
import { CreatequoteDto } from './dto/create-quote.dto';
import { UpdatequoteDto } from './dto/update-quote.dto';

@Controller('quote')
export class quoteController {
  constructor(private readonly quoteService: quoteService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.quoteService.findAll(query);
  }
}
