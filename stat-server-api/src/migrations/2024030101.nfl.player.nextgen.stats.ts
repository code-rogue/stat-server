import {
    NFLSchema,
    SeasonNextGenPassTable,
    SeasonNextGenRecTable,
    SeasonNextGenRushTable
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

    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonNextGenPassTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonNextGenRecTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonNextGenRushTable));

    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonNextGenPassTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonNextGenRecTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonNextGenRushTable));
};

export const down: Migration = async ({ }) => {
    await WeeklyNextGenStatsRush.drop();
    await WeeklyNextGenStatsRec.drop();
    await WeeklyNextGenStatsPass.drop();
};