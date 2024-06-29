import { NFLSchema, UnmatchedPlayerStatsTable } from '../constants/nfl/service.constants';
import { UnmatchedPlayerStats } from './models/nfl.unmatched.player.stat.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await UnmatchedPlayerStats.sync();
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, UnmatchedPlayerStatsTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, UnmatchedPlayerStatsTable));
};

export const down: Migration = async ({ }) => {
    await UnmatchedPlayerStats.drop();
};