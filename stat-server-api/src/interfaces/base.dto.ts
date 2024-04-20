import { ApiProperty } from '@nestjs/swagger';
import { SortDirection } from '@interfaces/enums/app.enums';

export default class BaseDto {
    id?: number;
    @ApiProperty({ 
      required: false,
      description: 'Filter by a comma separated list of ids' 
    })
    ids?: string;
    @ApiProperty({ required: false })
    sort?: string[] | string;
    @ApiProperty({ enum: SortDirection, enumName: 'Sort Direction', required: false })
    sort_direction?: SortDirection;
}