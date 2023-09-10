import { Body, Controller, Get, Post } from '@nestjs/common';
import { MicoRouterService } from './mico-router.service';

@Controller('mico-router')
export class MicoRouterController {
  constructor(private readonly micoRouterService: MicoRouterService) {}

  @Post()
  findAll(@Body() body: { role: string[] }) {
    return this.micoRouterService.findAll(body);
  }

  @Get('microConfigList')
  getMicroConfigList() {
    return this.micoRouterService.getMicroConfigList();
  }
}
