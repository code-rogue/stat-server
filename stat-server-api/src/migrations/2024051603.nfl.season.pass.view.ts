import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    try {
        await sequelize.query(`
        CREATE OR REPLACE VIEW nfl.player_season_pass_view
            AS SELECT 1 AS id,
                pws.player_id,
                pws.season,
                sum(pws.fantasy_points) AS fantasy_points,
                sum(pws.fantasy_points_ppr) AS fantasy_points_ppr,
                sum(wsp.attempts) AS attempts,
                sum(wsp.completions) AS completions,
                sum(wsp.pass_yards) AS pass_yards,
                sum(wsp.pass_yards_after_catch) AS pass_yards_after_catch,
                sum(wsp.pass_air_yards) AS pass_air_yards,
                avg(wsp.pass_air_conversion_ratio) AS pass_air_conversion_ratio,
                sum(wsp.pass_first_downs) AS pass_first_downs,
                avg(wsp.dakota) AS dakota,
                avg(wsp.pass_epa) AS pass_epa,
                sum(wsp.pass_tds) AS pass_tds,
                sum(wsp.pass_two_pt_conversions) AS pass_two_pt_conversions,
                sum(wsp.interceptions) AS interceptions,
                sum(wsp.sacks) AS sacks,
                sum(wsp.sack_yards) AS sack_yards,
                sum(wsp.sack_fumbles) AS sack_fumbles,
                sum(wsp.sack_fumbles_lost) AS sack_fumbles_lost
            FROM nfl.player_weekly_stats pws
                LEFT JOIN nfl.weekly_stats_pass wsp ON pws.id = wsp.player_weekly_id
            GROUP BY pws.season, pws.player_id;`);
    } catch (error) {
        console.error('Error creating season def view:', error);
    }
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.query('DROP VIEW nfl.player_season_pass_view;')
};