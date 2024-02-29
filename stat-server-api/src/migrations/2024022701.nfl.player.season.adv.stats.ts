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

    await query.sequelize.query(timestampInsertTrigger('player_season_stats_insert_trigger', 'nfl', 'player_season_stats'));
    await query.sequelize.query(timestampInsertTrigger('season_adv_pass_insert_trigger', 'nfl', 'season_adv_stats_pass'));
    await query.sequelize.query(timestampInsertTrigger('season_adv_rush_insert_trigger', 'nfl', 'season_adv_stats_rush'));
    await query.sequelize.query(timestampInsertTrigger('season_adv_rec_insert_trigger', 'nfl', 'season_adv_stats_rec'));
    await query.sequelize.query(timestampInsertTrigger('season_adv_def_insert_trigger', 'nfl', 'season_adv_stats_def'));

    await query.sequelize.query(timestampUpdateTrigger('player_season_stats_update_trigger', 'nfl', 'player_season_stats'));
    await query.sequelize.query(timestampUpdateTrigger('season_adv_pass_update_trigger', 'nfl', 'season_adv_stats_pass'));
    await query.sequelize.query(timestampUpdateTrigger('season_adv_rush_update_trigger', 'nfl', 'season_adv_stats_rush'));
    await query.sequelize.query(timestampUpdateTrigger('season_adv_rec_update_trigger', 'nfl', 'season_adv_stats_rec'));
    await query.sequelize.query(timestampUpdateTrigger('season_adv_def_update_trigger', 'nfl', 'season_adv_stats_def'));
};

export const down: Migration = async ({ }) => {
    await SeasonAdvStatsRush.drop();
    await SeasonAdvStatsRec.drop();
    await SeasonAdvStatsPass.drop();
    await SeasonAdvStatsDef.drop();
    await PlayerSeasonStats.drop();
};