import { ApiProperty } from '@nestjs/swagger';
import { 
  PaginationAPI, 
  PaginationDto, 
  WhereClause 
} from '@app/app.dto';

export enum CareerStatus {
  ActiveOnly = 'Active',
  All = 'All',
  InactiveOnly = 'Inactive',
}

export enum PositionGroup {
  DB = 'DB',
  DL = 'DL',
  LB = 'LB',
  OL = 'OL',
  RB = 'RB',  
  SPEC = 'SPEC',
  TE = 'TE',
  WR = 'WR',
  QB = 'QB',
}

export enum Position {
  C = 'C',
  CB = 'CB',
  DB = 'DB',
  DE = 'DE',
  DL = 'DL',
  DT = 'DT',
  FB = 'FB',
  FS = 'FS',
  G = 'G',
  HB = 'HB',
  ILB = 'ILB',
  K = 'K',
  KR = 'KR',
  LB = 'LB',
  LS = 'LS',
  MLB = 'MLB',
  NT = 'NT',
  OG = 'OG',
  OL = 'OL',
  OT = 'OT',
  OLB = 'OLB',
  P = 'P',
  PR = 'PR',
  RB = 'RB',
  S = 'S',
  SAF = 'SAF',
  SPEC = 'SPEC',
  SS = 'SS',
  T = 'T',
  TE = 'TE',
  WR = 'WR',
  QB = 'QB',
}

export class PlayerQueryDto extends PaginationDto {
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

export class PlayerQueryAPI extends PaginationAPI {
    name?: string;
    position?: Position;
    position_group?: PositionGroup;
    status?: CareerStatus;

    constructor(options: PlayerQueryDto) {
      super(options);
      
      this.name = options.name;
      this.position = options.position;
      this.position_group = options.position_group;
      this.status = this.status;
    }

    public buildPlayerWhereClause(): WhereClause {
      const { Op } = require('sequelize');
      
      const clause = {};
      if (this.id) {
        clause['id'] = { [Op.eq]: this.id }; 
      } else {
        if(this.ids.length) {
          clause['id'] = { [Op.in]: this.ids }; 
        }

        if (this.name) {
            clause['full_name'] = { [Op.iLike]: `%${this.name}%` }; 
        }
        
        const status = this.status ?? CareerStatus.ActiveOnly;
        if (status === CareerStatus.ActiveOnly) {
            clause['career_status'] = { [Op.iLike]: 'ACT' }; 
        } else if (status === CareerStatus.InactiveOnly) {
            clause['career_status'] = { [Op.notILike]: 'ACT' }; 
        }
      }
      
      return clause;
    }
  
    public buildLeagueWhereClause(): WhereClause {
      const { Op } = require('sequelize');
      
      const clause = {};
      if (this.position) {
          clause['position'] = { [Op.eq]: `${this.position}` }; 
      }
      if (this.position_group) {
          clause['position_group'] = { [Op.eq]: `${this.position_group}` }; 
      }
      
      return clause;
    }
  }

