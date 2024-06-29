import {
    NFLSchema,
    CalcSeasonStats,
} from '../constants/nfl/service.constants';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    sequelize.query(`create or replace procedure ${NFLSchema}.${CalcSeasonStats}()
    LANGUAGE SQL
    as $$
        with parse_team as (
            select
                pws.player_id,    
                pws.season,
                pws.week,
                pws.team_id,
                pws.fantasy_points,
                pws.fantasy_points_ppr
            from nfl.player_weekly_stats pws
                where pws.player_id is not null and pws.season is not null
        ), season_stats as (
            select
                pt.player_id,
                pt.season,
                team_id,
                count(week) as games_played,
                sum(pt.fantasy_points) AS fantasy_points,
                sum(pt.fantasy_points_ppr) AS fantasy_points_ppr
            from parse_team pt
            group by pt.season, pt.player_id, pt.team_id 
        )
        merge into nfl.player_season_stats as pss 
        using season_stats as ss on ss.player_id = pss.player_id and ss.season = pss.season and ss.team_id = pss.team_id
        when matched then 
            update set team_id = ss.team_id,
                games_played = ss.games_played,
                fantasy_points = ss.fantasy_points,
                fantasy_points_ppr = ss.fantasy_points_ppr               
        when not matched then
            insert (player_id, season, team_id, games_played, fantasy_points, fantasy_points_ppr)
            values (ss.player_id, ss.season, ss.team_id, ss.games_played, ss.fantasy_points, ss.fantasy_points_ppr);
    $$`);
}

export const down: Migration = async ({ context: sequelize }) => {
    sequelize.query(`drop procedure ${NFLSchema}.${CalcSeasonStats}`);
}