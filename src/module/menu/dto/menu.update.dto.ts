import { PartialType } from '@nestjs/swagger';
import { CreateDto } from '~/module/menu/dto/create.dto';

export class MenuUpdateDto extends PartialType(CreateDto) {
}