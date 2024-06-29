import { Player }  from './nfl.player.model';
import { Team }  from './nfl.team.model';
import { sequelize } from '../../sequelize';
import { 
  SeasonModelLabel,
  SeasonDefModelLabel,
  SeasonKickModelLabel,
  SeasonPassModelLabel,
  SeasonRecModelLabel,
  SeasonRushModelLabel,
} from '../../constants/nfl/service.constants';
import { 
    seasonDefModelOptions, 
    seasonDefSchema
} from '../../player/models/schema/season/basic/season.def.schema';
import { 
    seasonKickModelOptions, 
  seasonKickSchema
} from '../../player/models/schema/season/basic/season.kick.schema';
import { 
  seasonModelOptions, 
  seasonSchema
} from '../../player/models/schema/season/season.schema';
import { 
    seasonPassModelOptions, 
  seasonPassSchema
} from '../../player/models/schema/season/basic/season.pass.schema';
import { 
    seasonRecModelOptions, 
  seasonRecSchema
} from '../../player/models/schema/season/basic/season.rec.schema';
import { 
    seasonRushModelOptions, 
    seasonRushSchema
} from '../../player/models/schema/season/basic/season.rush.schema';

export const PlayerSeasonStats = sequelize.define(
    SeasonModelLabel,
    seasonSchema(Player, Team),
    seasonModelOptions(sequelize)
);

export const SeasonStatsDef = sequelize.define(
    SeasonDefModelLabel,
    seasonDefSchema(PlayerSeasonStats),
    seasonDefModelOptions(sequelize)
);

export const SeasonStatsKick = sequelize.define(
    SeasonKickModelLabel,
    seasonKickSchema(PlayerSeasonStats),
    seasonKickModelOptions(sequelize)
);

export const SeasonStatsPass = sequelize.define(
    SeasonPassModelLabel,
    seasonPassSchema(PlayerSeasonStats),
    seasonPassModelOptions(sequelize)
);

export const SeasonStatsRec = sequelize.define(
    SeasonRecModelLabel,
    seasonRecSchema(PlayerSeasonStats),
    seasonRecModelOptions(sequelize)
);

export const SeasonStatsRush = sequelize.define(
    SeasonRushModelLabel,
    seasonRushSchema(PlayerSeasonStats),
    seasonRushModelOptions(sequelize)
);