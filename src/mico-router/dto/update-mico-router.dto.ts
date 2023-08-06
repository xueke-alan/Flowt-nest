import { PartialType } from '@nestjs/mapped-types';
import { CreateMicoRouterDto } from './create-mico-router.dto';

export class UpdateMicoRouterDto extends PartialType(CreateMicoRouterDto) {}
