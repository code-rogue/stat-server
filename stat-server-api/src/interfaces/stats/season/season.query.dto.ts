import { ApiProperty } from '@nestjs/swagger';
import PaginationDto from '@interfaces/pagination.dto';

export default class SeasonQueryDto extends PaginationDto {
    @ApiProperty({ required: false })
    player_id?: number;
    @ApiProperty({ 
        description: 'Filter by a comma separated list of seasons [yyyy]' ,
        required: false,
    })
    seasons?: string;
}