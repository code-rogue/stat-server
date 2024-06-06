import { Includeable, Sequelize } from 'sequelize';
import { 
  isDefensivePlayer,
  isKicker,
  isOffensivePlayer 
} from '@player/utils/player.utils';
import PaginationAPI from '@interfaces/pagination.api';
import { PlayerQueryModel } from '@interfaces/player/player.query.model';
import SeasonAdvDefStatModel from '@player/models/season/advanced/season.adv.def.model';
import SeasonAdvPassStatModel from '@player/models/season/advanced/season.adv.pass.model';
import SeasonAdvRecStatModel from '@player/models/season/advanced/season.adv.rec.model';
import SeasonAdvRushStatModel from '@player/models/season/advanced/season.adv.rush.model';
import { 
  SeasonDefModelLabel,
  SeasonModelLabel, 
  SeasonKickModelLabel,
  SeasonPassModelLabel,
  SeasonRecModelLabel,
  SeasonRushModelLabel 
} from '@constants/nfl/service.constants';

import SeasonDefStatModel from '@player/models/season/season.def.model';
import SeasonKickStatModel from '@player/models/season/season.kick.model';
import SeasonQueryDto from '@interfaces/stats/season/season.query.dto';
import SeasonPassStatModel from '@player/models/season/season.pass.model';
import SeasonRecStatModel from '@player/models/season/season.rec.model';
import SeasonRushStatModel from '@player/models/season/season.rush.model';
import { twoColumnSeasonJoin } from '@database/database.utils';

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

    public buildIncludes(sequelize: Sequelize, playerData: PlayerQueryModel): Includeable[] {
      if(isOffensivePlayer(playerData)) {
        return [
            SeasonAdvPassStatModel,
            SeasonAdvRecStatModel,
            SeasonAdvRushStatModel,
            twoColumnSeasonJoin(sequelize, SeasonPassStatModel, SeasonModelLabel, SeasonPassModelLabel),
            twoColumnSeasonJoin(sequelize, SeasonRecStatModel, SeasonModelLabel, SeasonRecModelLabel),
            twoColumnSeasonJoin(sequelize, SeasonRushStatModel, SeasonModelLabel, SeasonRushModelLabel)
        ];
      }

      if(isDefensivePlayer(playerData)) {
        return [
            SeasonAdvDefStatModel,
            twoColumnSeasonJoin(sequelize, SeasonDefStatModel, SeasonModelLabel, SeasonDefModelLabel),
        ];
      }

      if(isKicker(playerData)) {
        return [
          twoColumnSeasonJoin(sequelize, SeasonKickStatModel, SeasonModelLabel, SeasonKickModelLabel),
        ];
      }

      // Return all stats
      return [ 
        SeasonAdvDefStatModel,
        SeasonAdvPassStatModel,
        SeasonAdvRecStatModel,
        SeasonAdvRushStatModel,
        twoColumnSeasonJoin(sequelize, SeasonDefStatModel, SeasonModelLabel, SeasonDefModelLabel),
        twoColumnSeasonJoin(sequelize, SeasonKickStatModel, SeasonModelLabel, SeasonKickModelLabel),
        twoColumnSeasonJoin(sequelize, SeasonPassStatModel, SeasonModelLabel, SeasonPassModelLabel),
        twoColumnSeasonJoin(sequelize, SeasonRecStatModel, SeasonModelLabel, SeasonRecModelLabel),
        twoColumnSeasonJoin(sequelize, SeasonRushStatModel, SeasonModelLabel, SeasonRushModelLabel)
      ];
    }
}