import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MicoRouterService } from './mico-router.service';

@Controller('mico-router')
export class MicoRouterController {
  constructor(private readonly micoRouterService: MicoRouterService) {}

  @Post()
  findAll(@Body() Body: { role: string[] }) {
    return this.micoRouterService.findAll(Body);
  }

 
}
