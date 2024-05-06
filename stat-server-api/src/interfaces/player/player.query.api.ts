import { CareerStatus, Position, PositionGroup } from '@interfaces/enums/player.enums';
import { NFL_TEAMS as Team } from '@interfaces/enums/teams.enums';
import PaginationAPI from '@interfaces/pagination.api';
import PlayerQueryDto from '@interfaces/player/player.query.dto';

import type { WhereClause } from '@interfaces/types/app.types';

export default class PlayerQueryAPI extends PaginationAPI {
    name?: string;
    position?: Position;
    position_group?: PositionGroup;    
    status?: CareerStatus;
    team: Team;

    constructor(options: PlayerQueryDto) {
      super(options);
      
      this.name = options.name;
      this.position = options.position;
      this.position_group = options.position_group;
      this.status = options.status;
      this.team = options.team;
    }

    public buildPlayerWhereClause(): WhereClause {
      const { Op } = require('sequelize');
      
      const clause = {};
      if (this.id) {
        clause['id'] = { [Op.eq]: this.id }; 
      } else {
        if(this.ids?.length) {
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
      if (this.team) {
        clause['team'] = { [Op.eq]: `${this.team}` };
      }
      
      return clause;
    }
  }

