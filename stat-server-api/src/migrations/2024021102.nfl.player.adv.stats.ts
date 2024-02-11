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

    await query.sequelize.query(timestampInsertTrigger('weekly_adv_passe_insert_trigger', 'nfl', 'weekly_adv_stats_pass'));
    await query.sequelize.query(timestampInsertTrigger('weekly_adv_rush_insert_trigger', 'nfl', 'weekly_adv_stats_rush'));
    await query.sequelize.query(timestampInsertTrigger('weekly_adv_rec_insert_trigger', 'nfl', 'weekly_adv_stats_rec'));
    await query.sequelize.query(timestampInsertTrigger('weekly_adv_def_insert_trigger', 'nfl', 'weekly_adv_stats_def'));

    await query.sequelize.query(timestampUpdateTrigger('weekly_adv_pass_update_trigger', 'nfl', 'weekly_adv_stats_pass'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_adv_ruch_update_trigger', 'nfl', 'weekly_adv_stats_rush'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_adv_rec_update_trigger', 'nfl', 'weekly_adv_stats_rec'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_adv_def_update_trigger', 'nfl', 'weekly_adv_stats_def'));
};

export const down: Migration = async ({ }) => {
    await WeeklyAdvStatsRush.drop();
    await WeeklyAdvStatsRec.drop();
    await WeeklyAdvStatsPass.drop();
    await WeeklyAdvStatsDef.drop();
};