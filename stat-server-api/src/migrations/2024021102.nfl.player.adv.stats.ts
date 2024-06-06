import {
    NFLSchema,
    WeeklyAdvDefTable,
    WeeklyAdvPassTable,
    WeeklyAdvRecTable,
    WeeklyAdvRushTable
} from '../constants/nfl/service.constants';
import { 
    WeeklyAdvStatsDef,
    WeeklyAdvStatsPass,
    WeeklyAdvStatsRec,
    WeeklyAdvStatsRush,    
 } from './models/nfl.player.adv.stats.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await WeeklyAdvStatsDef.sync();
    await WeeklyAdvStatsPass.sync();
    await WeeklyAdvStatsRec.sync();
    await WeeklyAdvStatsRush.sync();

    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyAdvDefTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyAdvPassTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyAdvRecTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyAdvRushTable));

    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyAdvDefTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyAdvPassTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyAdvRecTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyAdvRushTable));
};

export const down: Migration = async ({ }) => {
    await WeeklyAdvStatsRush.drop();
    await WeeklyAdvStatsRec.drop();
    await WeeklyAdvStatsPass.drop();
    await WeeklyAdvStatsDef.drop();
};