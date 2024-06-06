import {
    NFLSchema,
    SeasonStatTable,
    SeasonAdvDefTable,
    SeasonAdvPassTable,    
    SeasonAdvRecTable,
    SeasonAdvRushTable
} from '../constants/nfl/service.constants';
import { 
    PlayerSeasonStats,
    SeasonAdvStatsDef,
    SeasonAdvStatsPass,
    SeasonAdvStatsRec,
    SeasonAdvStatsRush,    
 } from './models/nfl.player.season.adv.stats.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await PlayerSeasonStats.sync();
    await SeasonAdvStatsDef.sync();
    await SeasonAdvStatsPass.sync();
    await SeasonAdvStatsRec.sync();
    await SeasonAdvStatsRush.sync();

    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonStatTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonAdvDefTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonAdvPassTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonAdvRecTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonAdvRushTable));

    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonStatTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonAdvDefTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonAdvPassTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonAdvRecTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonAdvRushTable));
};

export const down: Migration = async ({ }) => {
    await SeasonAdvStatsRush.drop();
    await SeasonAdvStatsRec.drop();
    await SeasonAdvStatsPass.drop();
    await SeasonAdvStatsDef.drop();
    await PlayerSeasonStats.drop();
};