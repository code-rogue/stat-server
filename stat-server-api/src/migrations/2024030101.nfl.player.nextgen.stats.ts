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

    await query.sequelize.query(timestampInsertTrigger('weekly_nextgen_pass_insert_trigger', 'nfl', 'weekly_nextgen_stats_pass'));
    await query.sequelize.query(timestampInsertTrigger('weekly_nextgen_rush_insert_trigger', 'nfl', 'weekly_nextgen_stats_rush'));
    await query.sequelize.query(timestampInsertTrigger('weekly_nextgen_rec_insert_trigger', 'nfl', 'weekly_nextgen_stats_rec'));

    await query.sequelize.query(timestampUpdateTrigger('weekly_nextgen_pass_update_trigger', 'nfl', 'weekly_nextgen_stats_pass'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_nextgen_rush_update_trigger', 'nfl', 'weekly_nextgen_stats_rush'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_nextgen_rec_update_trigger', 'nfl', 'weekly_nextgen_stats_rec'));
};

export const down: Migration = async ({ }) => {
    await WeeklyNextGenStatsRush.drop();
    await WeeklyNextGenStatsRec.drop();
    await WeeklyNextGenStatsPass.drop();
};