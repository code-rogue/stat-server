import {
    NFLSchema,
    WeeklyNextGenPassTable,
    WeeklyNextGenRecTable,
    WeeklyNextGenRushTable
} from '../constants/nfl/service.constants';
import { 
    WeeklyNextGenStatsPass,    
    WeeklyNextGenStatsRec,
    WeeklyNextGenStatsRush,
 } from './models/nfl.player.nextgen.stats.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await WeeklyNextGenStatsPass.sync();
    await WeeklyNextGenStatsRec.sync();
    await WeeklyNextGenStatsRush.sync();

    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyNextGenPassTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyNextGenRecTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, WeeklyNextGenRushTable));

    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyNextGenPassTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyNextGenRecTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, WeeklyNextGenRushTable));
};

export const down: Migration = async ({ }) => {
    await WeeklyNextGenStatsRush.drop();
    await WeeklyNextGenStatsRec.drop();
    await WeeklyNextGenStatsPass.drop();
};