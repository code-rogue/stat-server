import {
    NFLSchema,
    CalcSeasonKickStats,
} from '../constants/nfl/service.constants';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    sequelize.query(`create or replace procedure ${NFLSchema}.${CalcSeasonKickStats}()
    LANGUAGE SQL
    as $$
        with kick_stats as (
            select
                pws.player_id,
                pws.season,
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
            from nfl.player_weekly_stats pws
                inner join nfl.weekly_stats_kick ws ON pws.id = ws.player_weekly_id
              where pws.player_id is not null and pws.season is not null
              group by pws.season, pws.player_id
          ), season_stats as (
            select 
                s.id as player_season_id,
                ss.fg_att,
                ss.fg_made,
                ss.fg_missed,
                ss.fg_blocked,
                ss.fg_pct,
                ss.fg_long,
                ss.fg_made_0_19,
                ss.fg_made_20_29,
                ss.fg_made_30_39,
                ss.fg_made_40_49,
                ss.fg_made_50_59,
                ss.fg_made_60_,
                ss.fg_missed_0_19,
                ss.fg_missed_20_29,
                ss.fg_missed_30_39,
                ss.fg_missed_40_49,
                ss.fg_missed_50_59,
                ss.fg_missed_60_,
                ss.fg_made_distance,
                ss.fg_missed_distance,
                ss.fg_blocked_distance,
                ss.gwfg_att,
				ss.gwfg_distance,
				ss.gwfg_made,
				ss.gwfg_missed,
				ss.gwfg_blocked,
				ss.pat_att,
				ss.pat_made,
				ss.pat_missed,
				ss.pat_blocked,
				ss.pat_pct
            from kick_stats as ss 
                inner join nfl.player_season_stats as s on s.player_id = ss.player_id and s.season = ss.season
        )
        merge into nfl.season_stats_kick as ssd 
        using season_stats as ss on ss.player_season_id = ssd.player_season_id
        when matched then 
            update set fg_att = ss.fg_att,
                fg_made = ss.fg_made,
                fg_missed = ss.fg_missed,
                fg_blocked = ss.fg_blocked,
                fg_pct = ss.fg_pct,
                fg_long = ss.fg_long,
                fg_made_0_19 = ss.fg_made_0_19,
                fg_made_20_29 = ss.fg_made_20_29,
                fg_made_30_39 = ss.fg_made_30_39,
                fg_made_40_49 = ss.fg_made_40_49,
                fg_made_50_59 = ss.fg_made_50_59,
                fg_made_60_ = ss.fg_made_60_,
				fg_missed_0_19 = ss.fg_missed_0_19,
                fg_missed_20_29 = ss.fg_missed_20_29,
                fg_missed_30_39 = ss.fg_missed_30_39,
                fg_missed_40_49 = ss.fg_missed_40_49,
                fg_missed_50_59 = ss.fg_missed_50_59,
                fg_missed_60_ = ss.fg_missed_60_,
                fg_made_distance = ss.fg_made_distance,
                fg_missed_distance = ss.fg_missed_distance,
                fg_blocked_distance = ss.fg_blocked_distance,
                gwfg_att = ss.gwfg_att,
				gwfg_distance = ss.gwfg_distance,
				gwfg_made = ss.gwfg_made,
				gwfg_missed = ss.gwfg_missed,
				gwfg_blocked = ss.gwfg_blocked,
				pat_att = ss.pat_att,
				pat_made = ss.pat_made,
				pat_missed = ss.pat_missed,
				pat_blocked = ss.pat_blocked,
				pat_pct = ss.pat_pct
        when not matched then
            insert (
				player_season_id, fg_att, fg_made, fg_missed, fg_blocked, fg_pct, fg_long, fg_made_0_19, fg_made_20_29, fg_made_30_39, fg_made_40_49, fg_made_50_59, fg_made_60_, 
				fg_missed_0_19, fg_missed_20_29, fg_missed_30_39, fg_missed_40_49, fg_missed_50_59, fg_missed_60_, fg_made_distance, fg_missed_distance, fg_blocked_distance, 
				gwfg_att, gwfg_distance, gwfg_made, gwfg_missed, gwfg_blocked, pat_att, pat_made, pat_missed, pat_blocked, pat_pct
			)
            values (
				ss.player_season_id, ss.fg_att, ss.fg_made, ss.fg_missed, ss.fg_blocked, ss.fg_pct, ss.fg_long, ss.fg_made_0_19, ss.fg_made_20_29, ss.fg_made_30_39, ss.fg_made_40_49, ss.fg_made_50_59, ss.fg_made_60_,
				ss.fg_missed_0_19, ss.fg_missed_20_29, ss.fg_missed_30_39, ss.fg_missed_40_49, ss.fg_missed_50_59, ss.fg_missed_60_, ss.fg_made_distance, ss.fg_missed_distance, ss.fg_blocked_distance, 
				ss.gwfg_att, ss.gwfg_distance, ss.gwfg_made, ss.gwfg_missed, ss.gwfg_blocked, ss.pat_att, ss.pat_made, ss.pat_missed, ss.pat_blocked, ss.pat_pct
			);
    $$`);
}

export const down: Migration = async ({ context: sequelize }) => {
    sequelize.query(`drop procedure ${NFLSchema}.${CalcSeasonKickStats}`);
}