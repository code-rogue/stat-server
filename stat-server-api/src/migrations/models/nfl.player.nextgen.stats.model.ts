import { PlayerWeeklyStats }  from './nfl.player.stats.model';
import { sequelize } from '../../sequelize';
import { 
    WeeklyNextGenPassModelLabel,
    WeeklyNextGenRecModelLabel,
    WeeklyNextGenRushModelLabel,
  } from '../../constants/nfl/service.constants';
 import { 
    weeklyNextGenPassModelOptions, 
    weeklyNextGenPassSchema
  } from '../../player/models/schema/weekly/nextGen/weekly.nextgen.pass.schema';
  import { 
    weeklyNextGenRecModelOptions, 
    weeklyNextGenRecSchema
  } from '../../player/models/schema/weekly/nextGen/weekly.nextgen.rec.schema';
  import { 
    weeklyNextGenRushModelOptions, 
    weeklyNextGenRushSchema
  } from '../../player/models/schema/weekly/nextGen/weekly.nextgen.rush.schema';

export const WeeklyNextGenStatsPass = sequelize.define(
    WeeklyNextGenPassModelLabel,
    weeklyNextGenPassSchema(PlayerWeeklyStats),
    weeklyNextGenPassModelOptions(sequelize)
);

export const WeeklyNextGenStatsRec = sequelize.define(
    WeeklyNextGenRecModelLabel,
    weeklyNextGenRecSchema(PlayerWeeklyStats),
    weeklyNextGenRecModelOptions(sequelize)
);

export const WeeklyNextGenStatsRush = sequelize.define(
    WeeklyNextGenRushModelLabel,
    weeklyNextGenRushSchema(PlayerWeeklyStats),
    weeklyNextGenRushModelOptions(sequelize)
);