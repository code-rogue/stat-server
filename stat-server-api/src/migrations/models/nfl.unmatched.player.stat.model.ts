import { sequelize } from '../../sequelize';

import { 
    UnmatchedPlayerStatModelLabel,
} from '../../constants/nfl/service.constants';
import { 
    unmatchedPlayerStatModelOptions, 
    unmatchedPlayerStatSchema
} from '../../player/models/schema/unmatched.player.stat.schema';

export const UnmatchedPlayerStats = sequelize.define(
    UnmatchedPlayerStatModelLabel,
    unmatchedPlayerStatSchema(),
    unmatchedPlayerStatModelOptions(sequelize)
);