import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    try {
        await sequelize.query(`
        CREATE OR REPLACE VIEW nfl.player_season_rec_view
            AS SELECT 1 AS id,
                pws.player_id,
                pws.season,
                sum(pws.fantasy_points) AS fantasy_points,
                sum(pws.fantasy_points_ppr) AS fantasy_points_ppr,
                sum(wsr.targets) AS targets,
                sum(wsr.receptions) AS receptions,
                avg(wsr.target_share) AS target_share,
                sum(wsr.rec_yards) AS rec_yards,
                sum(wsr.rec_yards_after_catch) AS rec_yards_after_catch,
                sum(wsr.rec_air_yards) AS rec_air_yards,
                avg(wsr.rec_air_yards_share) AS rec_air_yards_share,
                avg(wsr.rec_air_conversion_ratio) AS rec_air_conversion_ratio,
                avg(wsr.weighted_opportunity_rating) AS weighted_opportunity_rating,
                avg(wsr.rec_epa) AS rec_epa,
                sum(wsr.rec_tds) AS rec_tds,
                sum(wsr.rec_two_pt_conversions) AS rec_two_pt_conversions,
                sum(wsr.rec_first_downs) AS rec_first_downs,
                sum(wsr.rec_fumbles) AS rec_fumbles,
                sum(wsr.rec_fumbles_lost) AS rec_fumbles_lost
            FROM nfl.player_weekly_stats pws
                LEFT JOIN nfl.weekly_stats_rec wsr ON pws.id = wsr.player_weekly_id
            GROUP BY pws.season, pws.player_id;`);
    } catch (error) {
        console.error('Error creating season def view:', error);
    }
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.query('DROP VIEW nfl.player_season_rec_view;')
};