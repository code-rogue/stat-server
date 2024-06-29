import {
    NFLSchema,
    CalcSeasonNextGenPassStats,
} from '../constants/nfl/service.constants';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    sequelize.query(`create or replace procedure ${NFLSchema}.${CalcSeasonNextGenPassStats}()
LANGUAGE SQL
as $$
    with pass_stats as (
        select
            pws.player_id,
            pws.season,
            sum(ws.aggressiveness) AS aggressiveness,
            avg(ws.avg_time_to_throw) AS avg_time_to_throw,
            avg(ws.avg_air_distance) AS avg_air_distance,
            max(ws.max_air_distance) AS max_air_distance,
            avg(ws.avg_completed_air_yards) AS avg_completed_air_yards,
            avg(ws.avg_intended_air_yards) AS avg_intended_air_yards,
            avg(ws.avg_air_yards_differential) AS avg_air_yards_differential,
            avg(ws.avg_air_yards_to_sticks) AS avg_air_yards_to_sticks,
            max(ws.max_completed_air_distance) AS max_completed_air_distance,
            avg(ws.passer_rating) AS passer_rating,
            avg(ws.completion_pct) AS completion_pct,
            avg(ws.expected_completion_pct) AS expected_completion_pct,
            avg(ws.completions_above_expectation_pct) AS completions_above_expectation_pct
        from nfl.player_weekly_stats pws
            inner join nfl.weekly_nextgen_stats_pass ws ON pws.id = ws.player_weekly_id
        where pws.player_id is not null and pws.season is not null
        group by pws.season, pws.player_id
    ), season_stats as (
        select 
            s.id as player_season_id,
            ss.aggressiveness,
            ss.avg_time_to_throw,
            ss.avg_air_distance,
            ss.max_air_distance,
            ss.avg_completed_air_yards,
            ss.avg_intended_air_yards,
            ss.avg_air_yards_differential,
            ss.avg_air_yards_to_sticks,
            ss.max_completed_air_distance,
            ss.passer_rating,
            ss.completion_pct,
            ss.expected_completion_pct,
            ss.completions_above_expectation_pct
        from pass_stats as ss 
            inner join nfl.player_season_stats as s on s.player_id = ss.player_id and s.season = ss.season
    )
    merge into nfl.season_nextgen_stats_pass as ssd 
    using season_stats as ss on ss.player_season_id = ssd.player_season_id
    when matched then 
        update set aggressiveness = ss.aggressiveness,
            avg_time_to_throw = ss.avg_time_to_throw,
            avg_air_distance = ss.avg_air_distance,
            max_air_distance = ss.max_air_distance,
            avg_completed_air_yards = ss.avg_completed_air_yards,
            avg_intended_air_yards = ss.avg_intended_air_yards,
            avg_air_yards_differential = ss.avg_air_yards_differential,
            avg_air_yards_to_sticks = ss.avg_air_yards_to_sticks,
            max_completed_air_distance = ss.max_completed_air_distance,
            passer_rating = ss.passer_rating,
            completion_pct = ss.completion_pct,
            expected_completion_pct = ss.expected_completion_pct,
            completions_above_expectation_pct = ss.completions_above_expectation_pct
    when not matched then
        insert (player_season_id, aggressiveness, avg_time_to_throw, avg_air_distance, max_air_distance, avg_completed_air_yards,
                avg_intended_air_yards, avg_air_yards_differential, avg_air_yards_to_sticks, max_completed_air_distance,
                passer_rating, completion_pct, expected_completion_pct, completions_above_expectation_pct)
        values (ss.player_season_id, ss.aggressiveness, ss.avg_time_to_throw, ss.avg_air_distance, ss.max_air_distance, 
                ss.avg_completed_air_yards, ss.avg_intended_air_yards, ss.avg_air_yards_differential, ss.avg_air_yards_to_sticks,
                ss.max_completed_air_distance, ss.passer_rating, ss.completion_pct, ss.expected_completion_pct, ss.completions_above_expectation_pct);
    $$`);
}

export const down: Migration = async ({ context: sequelize }) => {
    sequelize.query(`drop procedure ${NFLSchema}.${CalcSeasonNextGenPassStats}`);
}