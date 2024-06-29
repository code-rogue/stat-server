import {
    NFLSchema,
    SeasonDefTable,
    SeasonKickTable,
    SeasonPassTable,
    SeasonRecTable,
    SeasonRushTable
} from '../constants/nfl/service.constants';
import { 
    SeasonStatsDef,
    SeasonStatsKick,
    SeasonStatsPass,
    SeasonStatsRec,
    SeasonStatsRush
 } from './models/nfl.player.season.stats.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await SeasonStatsDef.sync();
    await SeasonStatsKick.sync();
    await SeasonStatsPass.sync();
    await SeasonStatsRush.sync();
    await SeasonStatsRec.sync();
    
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonDefTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonKickTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonPassTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonRecTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonRushTable));

    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonDefTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonKickTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonPassTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonRecTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonRushTable));
};

export const down: Migration = async ({ }) => {
    await SeasonStatsRush.drop();
    await SeasonStatsRec.drop();
    await SeasonStatsPass.drop();
    await SeasonStatsKick.drop()
    await SeasonStatsDef.drop();    
};