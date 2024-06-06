import { PlayerSeasonStats }  from './nfl.player.season.stats.model';
import { sequelize } from '../../sequelize';
import { 
    SeasonNextGenPassModelLabel,
    SeasonNextGenRecModelLabel,
    SeasonNextGenRushModelLabel,
  } from '../../constants/nfl/service.constants';
 import { 
    seasonNextGenPassModelOptions, 
    seasonNextGenPassSchema
  } from '../../player/models/schema/season/nextGen/season.nextgen.pass.schema';
  import { 
    seasonNextGenRecModelOptions, 
    seasonNextGenRecSchema
  } from '../../player/models/schema/season/nextGen/season.nextgen.rec.schema';
  import { 
    seasonNextGenRushModelOptions, 
    seasonNextGenRushSchema
  } from '../../player/models/schema/season/nextGen/season.nextgen.rush.schema';

export const SeasonNextGenStatsPass = sequelize.define(
    SeasonNextGenPassModelLabel,
    seasonNextGenPassSchema(PlayerSeasonStats),
    seasonNextGenPassModelOptions(sequelize)
);

export const SeasonNextGenStatsRec = sequelize.define(
    SeasonNextGenRecModelLabel,
    seasonNextGenRecSchema(PlayerSeasonStats),
    seasonNextGenRecModelOptions(sequelize)
);

export const SeasonNextGenStatsRush = sequelize.define(
    SeasonNextGenRushModelLabel,
    seasonNextGenRushSchema(PlayerSeasonStats),
    seasonNextGenRushModelOptions(sequelize)
);