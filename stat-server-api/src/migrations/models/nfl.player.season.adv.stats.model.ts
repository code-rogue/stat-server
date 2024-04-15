import { sequelize } from '../../sequelize';

import { Player }  from './nfl.player.model';
import { 
  SeasonModelLabel, 
  SeasonAdvDefModelLabel,
  SeasonAdvPassModelLabel,
  SeasonAdvRecModelLabel,
  SeasonAdvRushModelLabel
} from '../../constants/nfl/service.constants';
import { 
  seasonAdvDefModelOptions, 
  seasonAdvDefSchema 
} from '../../player/models/schema/season/advanced/season.adv.def.schema';
import { 
  seasonAdvPassModelOptions, 
  seasonAdvPassSchema 
} from '../../player/models/schema/season/advanced/season.adv.pass.schema';
import { 
  seasonAdvRecModelOptions, 
  seasonAdvRecSchema 
} from '../../player/models/schema/season/advanced/season.adv.rec.schema';
import { 
  seasonAdvRushModelOptions,
  seasonAdvRushSchema
} from '../../player/models/schema/season/advanced/season.adv.rush.schema';
import { seasonModelOptions, seasonSchema } from '../../player/models/schema/season/season.schema';

export const PlayerSeasonStats = sequelize.define(
  SeasonModelLabel,
  seasonSchema(Player),
  seasonModelOptions(sequelize)
);

export const SeasonAdvStatsDef = sequelize.define(
  SeasonAdvDefModelLabel,
  seasonAdvDefSchema(PlayerSeasonStats),
  seasonAdvDefModelOptions(sequelize)
);

export const SeasonAdvStatsPass = sequelize.define(
  SeasonAdvPassModelLabel,
  seasonAdvPassSchema(PlayerSeasonStats),
  seasonAdvPassModelOptions(sequelize)
);

export const SeasonAdvStatsRec = sequelize.define(
  SeasonAdvRecModelLabel,
  seasonAdvRecSchema(PlayerSeasonStats),
  seasonAdvRecModelOptions(sequelize)
);

export const SeasonAdvStatsRush = sequelize.define(
  SeasonAdvRushModelLabel,
  seasonAdvRushSchema(PlayerSeasonStats),
  seasonAdvRushModelOptions(sequelize)
);