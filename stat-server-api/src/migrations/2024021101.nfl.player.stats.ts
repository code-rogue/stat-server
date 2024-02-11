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

    await query.sequelize.query(timestampInsertTrigger('player_weekly_stats_insert_trigger', 'nfl', 'player_weekly_stats'));
    await query.sequelize.query(timestampInsertTrigger('weekly_pass_insert_trigger', 'nfl', 'weekly_stats_pass'));
    await query.sequelize.query(timestampInsertTrigger('weekly_rush_insert_trigger', 'nfl', 'weekly_stats_rush'));
    await query.sequelize.query(timestampInsertTrigger('weekly_rec_insert_trigger', 'nfl', 'weekly_stats_rec'));
    await query.sequelize.query(timestampInsertTrigger('weekly_def_insert_trigger', 'nfl', 'weekly_stats_def'));
    await query.sequelize.query(timestampInsertTrigger('weekly_kick_insert_trigger', 'nfl', 'weekly_stats_kick'));

    await query.sequelize.query(timestampUpdateTrigger('player_weekly_stats_update_trigger', 'nfl', 'player_weekly_stats'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_pass_update_trigger', 'nfl', 'weekly_stats_pass'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_rush_update_trigger', 'nfl', 'weekly_stats_rush'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_rec_update_trigger', 'nfl', 'weekly_stats_rec'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_def_update_trigger', 'nfl', 'weekly_stats_def'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_kick_update_trigger', 'nfl', 'weekly_stats_kick'));
};

export const down: Migration = async ({ }) => {
    await WeeklyStatsKick.drop()
    await WeeklyStatsDef.drop();
    await WeeklyStatsRec.drop();
    await WeeklyStatsRush.drop();
    await WeeklyStatsPass.drop();
    await PlayerWeeklyStats.drop();
};