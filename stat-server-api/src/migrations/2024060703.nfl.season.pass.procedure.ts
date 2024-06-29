import {
    NFLSchema,
    CalcSeasonPassStats,
} from '../constants/nfl/service.constants';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    sequelize.query(`create or replace procedure ${NFLSchema}.${CalcSeasonPassStats}()
    LANGUAGE SQL
    as $$
        with pass_stats as (
            select
                pws.player_id,
                pws.season,
				sum(ws.attempts) AS attempts,
				sum(ws.completions) AS completions,
				sum(ws.pass_yards) AS pass_yards,
				sum(ws.pass_yards_after_catch) AS pass_yards_after_catch,
				sum(ws.pass_air_yards) AS pass_air_yards,
				avg(ws.pass_air_conversion_ratio) AS pass_air_conversion_ratio,
				sum(ws.pass_first_downs) AS pass_first_downs,
				avg(ws.dakota) AS dakota,
				avg(ws.pass_epa) AS pass_epa,
				sum(ws.pass_tds) AS pass_tds,
				sum(ws.pass_two_pt_conversions) AS pass_two_pt_conversions,
				sum(ws.interceptions) AS interceptions,
				sum(ws.sacks) AS sacks,
				sum(ws.sack_yards) AS sack_yards,
				sum(ws.sack_fumbles) AS sack_fumbles,
				sum(ws.sack_fumbles_lost) AS sack_fumbles_lost
            from nfl.player_weekly_stats pws
                inner join nfl.weekly_stats_pass ws ON pws.id = ws.player_weekly_id
              where pws.player_id is not null and pws.season is not null
              group by pws.season, pws.player_id
          ), season_stats as (
            select 
                s.id as player_season_id,
                ss.attempts,
                ss.completions,
                ss.pass_yards,
                ss.pass_yards_after_catch,
                ss.pass_air_yards,
                ss.pass_air_conversion_ratio,
                ss.pass_first_downs,
                ss.dakota,
                ss.pass_epa,
                ss.pass_tds,
                ss.pass_two_pt_conversions,
                ss.interceptions,
                ss.sacks,
                ss.sack_yards,
                ss.sack_fumbles,
                ss.sack_fumbles_lost
            from pass_stats as ss 
                inner join nfl.player_season_stats as s on s.player_id = ss.player_id and s.season = ss.season
        )
        merge into nfl.season_stats_pass as ssd 
        using season_stats as ss on ss.player_season_id = ssd.player_season_id
        when matched then 
            update set attempts = ss.attempts,
                completions = ss.completions,
                pass_yards = ss.pass_yards,
                pass_yards_after_catch = ss.pass_yards_after_catch,
                pass_air_yards = ss.pass_air_yards,
                pass_air_conversion_ratio = ss.pass_air_conversion_ratio,
                pass_first_downs = ss.pass_first_downs,
                dakota = ss.dakota,
                pass_epa = ss.pass_epa,
                pass_tds = ss.pass_tds,
                pass_two_pt_conversions = ss.pass_two_pt_conversions,
                interceptions = ss.interceptions,
                sacks = ss.sacks,
                sack_yards = ss.sack_yards,
                sack_fumbles = ss.sack_fumbles,
                sack_fumbles_lost = ss.sack_fumbles_lost
        when not matched then
            insert (player_season_id, attempts, completions, pass_yards, pass_yards_after_catch, pass_air_yards, pass_air_conversion_ratio, 
					pass_first_downs, dakota, pass_epa, pass_tds, pass_two_pt_conversions, interceptions, sacks, sack_yards, sack_fumbles, sack_fumbles_lost)
            values (ss.player_season_id, ss.attempts, ss.completions, ss.pass_yards, ss.pass_yards_after_catch, ss.pass_air_yards, ss.pass_air_conversion_ratio, 
					ss.pass_first_downs, ss.dakota, ss.pass_epa, ss.pass_tds, ss.pass_two_pt_conversions, ss.interceptions, ss.sacks, ss.sack_yards, ss.sack_fumbles, ss.sack_fumbles_lost);
    $$`);
}

export const down: Migration = async ({ context: sequelize }) => {
    sequelize.query(`drop procedure ${NFLSchema}.${CalcSeasonPassStats}`);
}