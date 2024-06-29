import { NFLSchema, WeeklyStatTable } from '../constants/nfl/service.constants';
import { PlayerWeeklyStats } from './models/nfl.player.stats.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await PlayerWeeklyStats.sync();

    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyStatTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyStatTable));
};

export const down: Migration = async ({ }) => {
    await PlayerWeeklyStats.drop();
};