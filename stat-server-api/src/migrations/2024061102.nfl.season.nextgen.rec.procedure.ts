import {
    NFLSchema,
    CalcSeasonNextGenRecStats,
} from '../constants/nfl/service.constants';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    sequelize.query(`create or replace procedure ${NFLSchema}.${CalcSeasonNextGenRecStats}()
LANGUAGE SQL
as $$
    with rec_stats as (
		select
			pws.player_id,
			pws.season,
			avg(ws.avg_cushion) AS avg_cushion,
			avg(ws.avg_separation) AS avg_separation,
			avg(ws.avg_intended_air_yards) AS avg_intended_air_yards,
			avg(ws.catch_pct) AS catch_pct,
			avg(ws.share_of_intended_air_yards_pct) AS share_of_intended_air_yards_pct,
			avg(ws.avg_yac) AS avg_yac,
			avg(ws.avg_expected_yac) AS avg_expected_yac,
			avg(ws.avg_yac_above_expectation) AS avg_yac_above_expectation
		from nfl.player_weekly_stats pws
			inner join nfl.weekly_nextgen_stats_rec ws ON pws.id = ws.player_weekly_id
		  where pws.player_id is not null and pws.season is not null
		  group by pws.season, pws.player_id
	  ), season_stats as (
		select 
			s.id as player_season_id,
			ss.avg_cushion,
			ss.avg_separation,
			ss.avg_intended_air_yards,
			ss.catch_pct,
			ss.share_of_intended_air_yards_pct,
			ss.avg_yac,
			ss.avg_expected_yac,
			ss.avg_yac_above_expectation
		from rec_stats as ss 
			inner join nfl.player_season_stats as s on s.player_id = ss.player_id and s.season = ss.season
	)
	merge into nfl.season_nextgen_stats_rec as ssd 
	using season_stats as ss on ss.player_season_id = ssd.player_season_id
	when matched then 
		update set avg_cushion = ss.avg_cushion,
			avg_separation = ss.avg_separation,
			avg_intended_air_yards = ss.avg_intended_air_yards,
			catch_pct = ss.catch_pct,
			share_of_intended_air_yards_pct = ss.share_of_intended_air_yards_pct,
			avg_yac = ss.avg_yac,
			avg_expected_yac = ss.avg_expected_yac,
			avg_yac_above_expectation = ss.avg_yac_above_expectation
	when not matched then
		insert (player_season_id, avg_cushion, avg_separation, avg_intended_air_yards, catch_pct, share_of_intended_air_yards_pct,
				avg_yac, avg_expected_yac, avg_yac_above_expectation)
		values (ss.player_season_id, ss.avg_cushion, ss.avg_separation, ss.avg_intended_air_yards, ss.catch_pct, 
				ss.share_of_intended_air_yards_pct, ss.avg_yac, ss.avg_expected_yac, ss.avg_yac_above_expectation);
    $$`);
}

export const down: Migration = async ({ context: sequelize }) => {
    sequelize.query(`drop procedure ${NFLSchema}.${CalcSeasonNextGenRecStats}`);
}