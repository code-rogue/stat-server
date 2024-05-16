import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    try {
        await sequelize.query(`
        CREATE OR REPLACE VIEW nfl.player_season_def_view
        AS SELECT 1 AS id,
            pws.player_id,
            pws.season,
            sum(pws.fantasy_points) AS fantasy_points,
            sum(pws.fantasy_points_ppr) AS fantasy_points_ppr,
            sum(ws.tackles) AS tackles,
            sum(ws.tackles_solo) AS tackles_solo,
            sum(ws.tackle_with_assists) AS tackle_with_assists,
            sum(ws.tackle_assists) AS tackle_assists,
            sum(ws.tackles_for_loss) AS tackles_for_loss,
            sum(ws.tackles_for_loss_yards) AS tackles_for_loss_yards,
            sum(ws.fumbles_forced) AS fumbles_forced,
            sum(ws.sacks) AS sacks,
            sum(ws.sack_yards) AS sack_yards,
            sum(ws.qb_hits) AS qb_hits,
            sum(ws.interceptions) AS interceptions,
            sum(ws.interception_yards) AS interception_yards,
            sum(ws.pass_defended) AS pass_defended,
            sum(ws.tds) AS tds,
            sum(ws.fumbles) AS fumbles,
            sum(ws.fumble_recovery_own) AS fumble_recovery_own,
            sum(ws.fumble_recovery_yards_own) AS fumble_recovery_yards_own,
            sum(ws.fumble_recovery_opp) AS fumble_recovery_opp,
            sum(ws.fumble_recovery_yards_opp) AS fumble_recovery_yards_opp,
            sum(ws.safety) AS safety,
            sum(ws.penalty) AS penalty,
            sum(ws.penalty_yards) AS penalty_yards
        FROM nfl.player_weekly_stats pws
            LEFT JOIN nfl.weekly_stats_def ws ON pws.id = ws.player_weekly_id
        GROUP BY pws.season, pws.player_id;`);
    } catch (error) {
        console.error('Error creating season def view:', error);
    }
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.query('DROP VIEW nfl.player_season_def_view;')
};