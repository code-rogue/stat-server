import {
    NFLSchema,
    WeeklyStatTable,
    WeeklyDefTable,
    WeeklyKickTable,
    WeeklyPassTable,
    WeeklyRecTable,
    WeeklyRushTable
} from '../constants/nfl/service.constants';
import { 
    PlayerWeeklyStats,
    WeeklyStatsDef,
    WeeklyStatsKick,
    WeeklyStatsPass,
    WeeklyStatsRec,
    WeeklyStatsRush,    
 } from './models/nfl.player.stats.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await PlayerWeeklyStats.sync();
    await WeeklyStatsPass.sync();
    await WeeklyStatsRush.sync();
    await WeeklyStatsRec.sync();
    await WeeklyStatsDef.sync();
    await WeeklyStatsKick.sync();

    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyStatTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyDefTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyKickTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyPassTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyRecTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyRushTable));

    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyStatTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyDefTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyKickTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyPassTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyRecTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyRushTable));
};

export const down: Migration = async ({ }) => {
    await WeeklyStatsKick.drop()
    await WeeklyStatsDef.drop();
    await WeeklyStatsRec.drop();
    await WeeklyStatsRush.drop();
    await WeeklyStatsPass.drop();
    await PlayerWeeklyStats.drop();
};