import { ApiProperty } from '@nestjs/swagger';
import BaseDto from '@interfaces/base.dto';

export default class PaginationDto extends BaseDto {
    @ApiProperty({ required: false })
    offset?: number;
    @ApiProperty({ required: false })
    limit?: number;
}