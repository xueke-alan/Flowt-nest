import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RbacService } from './rbac_.service';
import { CreateRbacDto } from './dto/create-rbac_.dto';
import { UpdateRbacDto } from './dto/update-rbac_.dto';

@Controller('rbac-')
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Post()
  create(@Body() createRbacDto: CreateRbacDto) {
    return this.rbacService.create(createRbacDto);
  }

  @Get()
  findAll() {
    return this.rbacService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rbacService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRbacDto: UpdateRbacDto) {
    return this.rbacService.update(+id, updateRbacDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rbacService.remove(+id);
  }
}
