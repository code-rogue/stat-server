import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    try {
        await sequelize.query(`
        CREATE OR REPLACE VIEW nfl.player_season_kick_view
            AS SELECT 1 AS id,
                pws.player_id,
                pws.season,
                sum(pws.fantasy_points) AS fantasy_points,
                sum(pws.fantasy_points_ppr) AS fantasy_points_ppr,
                sum(ws.fg_att) AS fg_att,
                sum(ws.fg_made) AS fg_made,
                sum(ws.fg_missed) AS fg_missed,
                sum(ws.fg_blocked) AS fg_blocked,
                avg(ws.fg_pct) AS fg_pct,
                sum(ws.fg_long) AS fg_long,
                sum(ws.fg_made_0_19) AS fg_made_0_19,
                sum(ws.fg_made_20_29) AS fg_made_20_29,
                sum(ws.fg_made_30_39) AS fg_made_30_39,
                sum(ws.fg_made_40_49) AS fg_made_40_49,
                sum(ws.fg_made_50_59) AS fg_made_50_59,
                sum(ws.fg_made_60_) AS fg_made_60_,
                sum(ws.fg_missed_0_19) AS fg_missed_0_19,
                sum(ws.fg_missed_20_29) AS fg_missed_20_29,
                sum(ws.fg_missed_30_39) AS fg_missed_30_39,
                sum(ws.fg_missed_40_49) AS fg_missed_40_49,
                sum(ws.fg_missed_50_59) AS fg_missed_50_59,
                sum(ws.fg_missed_60_) AS fg_missed_60_,
                sum(ws.fg_made_distance) AS fg_made_distance,
                sum(ws.fg_missed_distance) AS fg_missed_distance,
                sum(ws.fg_blocked_distance) AS fg_blocked_distance,
                sum(ws.gwfg_att) AS gwfg_att,
                sum(ws.gwfg_distance) AS gwfg_distance,
                sum(ws.gwfg_made) AS gwfg_made,
                sum(ws.gwfg_missed) AS gwfg_missed,
                sum(ws.gwfg_blocked) AS gwfg_blocked,
                sum(ws.pat_att) AS pat_att,
                sum(ws.pat_made) AS pat_made,
                sum(ws.pat_missed) AS pat_missed,
                sum(ws.pat_blocked) AS pat_blocked,
                avg(ws.pat_pct) AS pat_pct
            FROM nfl.player_weekly_stats pws
                LEFT JOIN nfl.weekly_stats_kick ws ON pws.id = ws.player_weekly_id
            GROUP BY pws.season, pws.player_id;`);
    } catch (error) {
        console.error('Error creating season def view:', error);
    }
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.query('DROP VIEW nfl.player_season_kick_view;')
};