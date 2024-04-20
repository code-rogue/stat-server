import { ApiProperty } from '@nestjs/swagger';
import { CareerStatus, Position, PositionGroup } from '@interfaces/enums/player.enums';
import PaginationDto from '@interfaces/pagination.dto';

export default class PlayerQueryDto extends PaginationDto {
    @ApiProperty({ required: false })
    name?: string;
    @ApiProperty({ enum: Position, enumName: 'Position', required: false })
    position?: Position;
    @ApiProperty({ enum: PositionGroup, enumName: 'Position Group', required: false })
    position_group?: PositionGroup;
    @ApiProperty({ enum: CareerStatus, enumName: 'Career Status', required: false })
    status?: CareerStatus;
    @ApiProperty({ 
      required: false, 
      description: 'Sort by career_status, game_status, full_name, first_name, last_name, short_name, suffix' 
    })
    sort?: string[];
}