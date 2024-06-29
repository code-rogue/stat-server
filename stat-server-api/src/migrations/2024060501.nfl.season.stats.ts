import {
    NFLSchema,
    SeasonStatTable
} from '../constants/nfl/service.constants';
import { PlayerSeasonStats } from './models/nfl.player.season.stats.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await PlayerSeasonStats.sync();
    
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, SeasonStatTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, SeasonStatTable));
};

export const down: Migration = async ({ }) => {
    await PlayerSeasonStats.drop();
};