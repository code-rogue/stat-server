import PaginationAPI from '@interfaces/pagination.api';
import SeasonQueryDto from '@interfaces/stats/season/season.query.dto';

import type { WhereClause } from '@interfaces/types/app.types';

export default class SeasonQueryAPI extends PaginationAPI {
    player_id?: number;
    seasons?: string[];

    constructor(options: SeasonQueryDto) {
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
          if(this.ids?.length) {
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