import {
    NFLSchema,
    SeasonNextGenPassTable,
    SeasonNextGenRecTable,
    SeasonNextGenRushTable
} from '../constants/nfl/service.constants';
import { 
    SeasonNextGenStatsPass,    
    SeasonNextGenStatsRec,
    SeasonNextGenStatsRush,
 } from './models/nfl.player.season.nextgen.stats.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await SeasonNextGenStatsPass.sync();
    await SeasonNextGenStatsRec.sync();
    await SeasonNextGenStatsRush.sync();

    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonNextGenPassTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonNextGenRecTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonNextGenRushTable));    

    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonNextGenPassTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonNextGenRecTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonNextGenRushTable));
    
};

export const down: Migration = async ({ }) => {
    await SeasonNextGenStatsRush.drop();
    await SeasonNextGenStatsRec.drop();
    await SeasonNextGenStatsPass.drop();
};