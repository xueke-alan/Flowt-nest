import { Body, Controller, Post } from '@nestjs/common';
import { MicoRouterService } from './mico-router.service';

@Controller('mico-router')
export class MicoRouterController {
  constructor(private readonly micoRouterService: MicoRouterService) {}

  @Post()
  findAll(@Body() body: { role: string[] }) {
    return this.micoRouterService.findAll(body);
  }
}
