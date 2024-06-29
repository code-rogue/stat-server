import {
    NFLSchema,
    CalcSeasonNextGenRushStats,
} from '../constants/nfl/service.constants';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    sequelize.query(`create or replace procedure ${NFLSchema}.${CalcSeasonNextGenRushStats}()
LANGUAGE SQL
as $$
    with rush_stats as (
		select
			pws.player_id,
			pws.season,
			avg(ws.efficiency) AS efficiency,
			avg(ws.attempts_gte_eight_defenders_pct) AS attempts_gte_eight_defenders_pct,
			avg(ws.avg_time_to_los) AS avg_time_to_los,
			avg(ws.expected_yards) AS expected_yards,
			avg(ws.yards_over_expected) AS yards_over_expected,
			avg(ws.avg_yards) AS avg_yards,
			avg(ws.yards_over_expected_per_att) AS yards_over_expected_per_att,
			avg(ws.yards_over_expected_pct) AS yards_over_expected_pct
		from nfl.player_weekly_stats pws
			inner join nfl.weekly_nextgen_stats_rush ws ON pws.id = ws.player_weekly_id
		  where pws.player_id is not null and pws.season is not null
		  group by pws.season, pws.player_id
	  ), season_stats as (
		select 
			s.id as player_season_id,
			ss.efficiency,
			ss.attempts_gte_eight_defenders_pct,
			ss.avg_time_to_los,
			ss.expected_yards,
			ss.yards_over_expected,
			ss.avg_yards,
			ss.yards_over_expected_per_att,
			ss.yards_over_expected_pct
		from rush_stats as ss 
			inner join nfl.player_season_stats as s on s.player_id = ss.player_id and s.season = ss.season
	)
	merge into nfl.season_nextgen_stats_rush as ssd 
	using season_stats as ss on ss.player_season_id = ssd.player_season_id
	when matched then 
		update set efficiency = ss.efficiency,
			attempts_gte_eight_defenders_pct = ss.attempts_gte_eight_defenders_pct,
			avg_time_to_los = ss.avg_time_to_los,
			expected_yards = ss.expected_yards,
			yards_over_expected = ss.yards_over_expected,
			avg_yards = ss.avg_yards,
			yards_over_expected_per_att = ss.yards_over_expected_per_att,
			yards_over_expected_pct = ss.yards_over_expected_pct
	when not matched then
		insert (player_season_id, efficiency, attempts_gte_eight_defenders_pct, avg_time_to_los, expected_yards, yards_over_expected,
				avg_yards, yards_over_expected_per_att, yards_over_expected_pct)
		values (ss.player_season_id, ss.efficiency, ss.attempts_gte_eight_defenders_pct, ss.avg_time_to_los, ss.expected_yards, 
				ss.yards_over_expected, ss.avg_yards, ss.yards_over_expected_per_att, ss.yards_over_expected_pct);
    $$`);
}

export const down: Migration = async ({ context: sequelize }) => {
    sequelize.query(`drop procedure ${NFLSchema}.${CalcSeasonNextGenRushStats}`);
}