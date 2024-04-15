import { ApiProperty } from '@nestjs/swagger';
import { 
    PaginationAPI, 
    PaginationDto, 
    WhereClause 
} from '@app/app.dto';

export class SeasonStatDto extends PaginationDto {
    @ApiProperty({ required: false })
    player_id?: number;
    @ApiProperty({ 
        description: 'Filter by a comma separated list of seasons [yyyy]' ,
        required: false,
    })
    seasons?: string;
}

export class SeasonStatQueryAPI extends PaginationAPI {
    player_id?: number;
    seasons?: string[];

    constructor(options: SeasonStatDto) {
        super(options);

        this.player_id = options.player_id;
        this.seasons = options.seasons?.split(',') ?? [];
    }

    public buildWhereClause(): WhereClause {
        const { Op } = require('sequelize');
        
        const clause = {};
        if (this.id) {
          clause['id'] = { [Op.eq]: this.id }; 
        } else {
          if(this.ids.length) {
            clause['id'] = { [Op.in]: this.ids }; 
          }
  
          if (this.player_id) {
              clause['player_id'] = { [Op.eq]: this.player_id }; 
          }
          
          if(this.seasons.length) {
            clause['season'] = { [Op.in]: this.seasons }; 
          }
        }
        
        return clause;
    }
}

export class WeeklyStatDto extends PaginationDto {
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

export class WeeklyStatQueryAPI extends PaginationAPI {
    player_id?: number;
    seasons?: string[];
    weeks?: string[];

    constructor(options: WeeklyStatDto) {
        super(options);

        this.player_id = options.player_id;
        this.seasons = options.seasons?.split(',') ?? [];
        this.weeks = options.weeks?.split(',') ?? [];
    }

    public buildWhereClause(): WhereClause {
        const { Op } = require('sequelize');
        
        const clause = {};
        if (this.id) {
          clause['id'] = { [Op.eq]: this.id }; 
        } else {
          if(this.ids.length) {
            clause['id'] = { [Op.in]: this.ids }; 
          }
  
          if (this.player_id) {
              clause['player_id'] = { [Op.eq]: this.player_id }; 
          }
          
          if(this.seasons.length) {
            clause['season'] = { [Op.in]: this.seasons }; 
          }

          if(this.weeks.length) {
            clause['week'] = { [Op.in]: this.weeks }; 
          }
        }
        
        return clause;
    }
}