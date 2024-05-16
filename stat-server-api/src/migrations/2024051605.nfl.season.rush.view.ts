import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    try {
        await sequelize.query(`
        CREATE OR REPLACE VIEW nfl.player_season_rush_view
            AS SELECT 1 AS id,
                pws.player_id,
                pws.season,
                sum(pws.fantasy_points) AS fantasy_points,
                sum(pws.fantasy_points_ppr) AS fantasy_points_ppr,
                sum(wsr.carries) AS carries,
                sum(wsr.rush_yards) AS rush_yards,
                sum(wsr.rush_first_downs) AS rush_first_downs,
                avg(wsr.rush_epa) AS rush_epa,
                sum(wsr.rush_tds) AS rush_tds,
                sum(wsr.rush_two_pt_conversions) AS rush_two_pt_conversions,
                sum(wsr.rush_fumbles) AS rush_fumbles,
                sum(wsr.rush_fumbles_lost) AS rush_fumbles_lost,
                sum(wsr.special_teams_tds) AS special_teams_tds
            FROM nfl.player_weekly_stats pws
                LEFT JOIN nfl.weekly_stats_rush wsr ON pws.id = wsr.player_weekly_id
            GROUP BY pws.season, pws.player_id;`);
    } catch (error) {
        console.error('Error creating season def view:', error);
    }
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.query('DROP VIEW nfl.player_season_rush_view;')
};