import PaginationAPI from '@interfaces/pagination.api';
import WeeklyQueryDto from '@interfaces/stats/weekly/weekly.query.dto';

import type { WhereClause } from '@interfaces/types/app.types';

export default class WeeklyQueryAPI extends PaginationAPI {
    player_id?: number;
    seasons?: string[];
    weeks?: string[];

    constructor(options: WeeklyQueryDto) {
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
          if(this.ids?.length) {
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