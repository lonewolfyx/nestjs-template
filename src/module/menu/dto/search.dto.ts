import { PaginationDto } from '~/dto/pagination.dto';
import { PartialType } from '@nestjs/swagger';


export class SearchDto extends PartialType(PaginationDto) {
}