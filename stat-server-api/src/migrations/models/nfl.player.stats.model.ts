import { Player }  from './nfl.player.model';
import { Team }  from './nfl.team.model';
import { sequelize } from '../../sequelize';
import { 
  WeeklyModelLabel,
  WeeklyDefModelLabel,
  WeeklyKickModelLabel,
  WeeklyPassModelLabel,
  WeeklyRecModelLabel,
  WeeklyRushModelLabel,
} from '../../constants/nfl/service.constants';
import { 
  weeklyDefModelOptions, 
  weeklyDefSchema
} from '../../player/models/schema/weekly/weekly.def.schema';
import { 
  weeklyKickModelOptions, 
  weeklyKickSchema
} from '../../player/models/schema/weekly/weekly.kick.schema';
import { 
  weeklyModelOptions, 
  weeklySchema
} from '../../player/models/schema/weekly/weekly.schema';
import { 
  weeklyPassModelOptions, 
  weeklyPassSchema
} from '../../player/models/schema/weekly/weekly.pass.schema';
import { 
  weeklyRecModelOptions, 
  weeklyRecSchema
} from '../../player/models/schema/weekly/weekly.rec.schema';
import { 
  weeklyRushModelOptions, 
  weeklyRushSchema
} from '../../player/models/schema/weekly/weekly.rush.schema';

export const PlayerWeeklyStats = sequelize.define(
    WeeklyModelLabel,
    weeklySchema(Player, Team),
    weeklyModelOptions(sequelize)
);

export const WeeklyStatsDef = sequelize.define(
  WeeklyDefModelLabel,
  weeklyDefSchema(PlayerWeeklyStats),
  weeklyDefModelOptions(sequelize)
);

export const WeeklyStatsKick = sequelize.define(
  WeeklyKickModelLabel,
  weeklyKickSchema(PlayerWeeklyStats),
  weeklyKickModelOptions(sequelize)
);

export const WeeklyStatsPass = sequelize.define(
  WeeklyPassModelLabel,
  weeklyPassSchema(PlayerWeeklyStats),
  weeklyPassModelOptions(sequelize)
);

export const WeeklyStatsRec = sequelize.define(
  WeeklyRecModelLabel,
  weeklyRecSchema(PlayerWeeklyStats),
  weeklyRecModelOptions(sequelize)
);

export const WeeklyStatsRush = sequelize.define(
  WeeklyRushModelLabel,
  weeklyRushSchema(PlayerWeeklyStats),
  weeklyRushModelOptions(sequelize)
);