import { PlayerWeeklyStats }  from './nfl.player.stats.model';
import { sequelize } from '../../sequelize';
import { 
  WeeklyAdvDefModelLabel,
  WeeklyAdvPassModelLabel,
  WeeklyAdvRecModelLabel,
  WeeklyAdvRushModelLabel,
} from '../../constants/nfl/service.constants';
import { 
  weeklyAdvDefModelOptions, 
  weeklyAdvDefSchema
} from '../../player/models/schema/weekly/advanced/weekly.adv.def.schema';
import { 
  weeklyAdvPassModelOptions, 
  weeklyAdvPassSchema
} from '../../player/models/schema/weekly/advanced/weekly.adv.pass.schema';
import { 
  weeklyAdvRecModelOptions, 
  weeklyAdvRecSchema
} from '../../player/models/schema/weekly/advanced/weekly.adv.rec.schema';
import { 
  weeklyAdvRushModelOptions, 
  weeklyAdvRushSchema
} from '../../player/models/schema/weekly/advanced/weekly.adv.rush.schema';

export const WeeklyAdvStatsDef = sequelize.define(
  WeeklyAdvDefModelLabel,
  weeklyAdvDefSchema(PlayerWeeklyStats),
  weeklyAdvDefModelOptions(sequelize)
);

export const WeeklyAdvStatsPass = sequelize.define(
  WeeklyAdvPassModelLabel,
  weeklyAdvPassSchema(PlayerWeeklyStats),
  weeklyAdvPassModelOptions(sequelize)
);

export const WeeklyAdvStatsRec = sequelize.define(
  WeeklyAdvRecModelLabel,
  weeklyAdvRecSchema(PlayerWeeklyStats),
  weeklyAdvRecModelOptions(sequelize)
);

export const WeeklyAdvStatsRush = sequelize.define(
  WeeklyAdvRushModelLabel,
  weeklyAdvRushSchema(PlayerWeeklyStats),
  weeklyAdvRushModelOptions(sequelize)
);