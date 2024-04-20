import { ApiProperty } from '@nestjs/swagger';
import PaginationDto from '@interfaces/pagination.dto';

export default class WeeklyQueryDto extends PaginationDto {
    @ApiProperty({ required: false })
    player_id?: number;
    @ApiProperty({ 
        description: 'Filter by a comma separated list of seasons [yyyy]' ,
        required: false,
     })
    seasons?: string;
    @ApiProperty({ 
        description: 'Filter by a comma separated list of weeks' ,
        required: false,
    })
    weeks?: string;
}