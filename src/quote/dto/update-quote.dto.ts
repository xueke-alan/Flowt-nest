import { PartialType } from '@nestjs/mapped-types';
import { CreatequoteDto } from './create-quote.dto';

export class UpdatequoteDto extends PartialType(CreatequoteDto) {}
