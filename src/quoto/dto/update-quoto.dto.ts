import { PartialType } from '@nestjs/mapped-types';
import { CreateQuotoDto } from './create-quoto.dto';

export class UpdateQuotoDto extends PartialType(CreateQuotoDto) {}
