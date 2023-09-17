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
import { QuotoService } from './quoto.service';
import { CreateQuotoDto } from './dto/create-quoto.dto';
import { UpdateQuotoDto } from './dto/update-quoto.dto';

@Controller('quoto')
export class QuotoController {
  constructor(private readonly quotoService: QuotoService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.quotoService.findAll(query);
  }
}
