import { 
    PlayerWeeklyStats,
    WeeklyDefensiveStats,
    WeeklyKickingStats,
    WeeklyPassingStats,
    WeeklyReceivingStats,
    WeeklyRushingStats,    
 } from './models/nfl.player.stats.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await PlayerWeeklyStats.sync();
    await WeeklyPassingStats.sync();
    await WeeklyRushingStats.sync();
    await WeeklyReceivingStats.sync();
    await WeeklyDefensiveStats.sync();
    await WeeklyKickingStats.sync();

    await query.sequelize.query(timestampInsertTrigger('player_weekly_insert_trigger', 'nfl', 'player_weekly_stats'));
    await query.sequelize.query(timestampInsertTrigger('weekly_passing_insert_trigger', 'nfl', 'weekly_passing_stats'));
    await query.sequelize.query(timestampInsertTrigger('weekly_rushing_insert_trigger', 'nfl', 'weekly_rushing_stats'));
    await query.sequelize.query(timestampInsertTrigger('weekly_receiving_insert_trigger', 'nfl', 'weekly_receiving_stats'));
    await query.sequelize.query(timestampInsertTrigger('weekly_defensive_insert_trigger', 'nfl', 'weekly_defensive_stats'));
    await query.sequelize.query(timestampInsertTrigger('weekly_kicking_insert_trigger', 'nfl', 'weekly_kicking_stats'));

    await query.sequelize.query(timestampUpdateTrigger('player_weekly_update_trigger', 'nfl', 'player_weekly_stats'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_passing_update_trigger', 'nfl', 'weekly_passing_stats'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_rushing_update_trigger', 'nfl', 'weekly_rushing_stats'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_receiving_update_trigger', 'nfl', 'weekly_receiving_stats'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_defensive_update_trigger', 'nfl', 'weekly_defensive_stats'));
    await query.sequelize.query(timestampUpdateTrigger('weekly_kicking_update_trigger', 'nfl', 'weekly_kicking_stats'));
};

export const down: Migration = async ({ }) => {
    await WeeklyKickingStats.drop()
    await WeeklyDefensiveStats.drop();
    await WeeklyReceivingStats.drop();
    await WeeklyRushingStats.drop();
    await WeeklyPassingStats.drop();
    await PlayerWeeklyStats.drop();
};