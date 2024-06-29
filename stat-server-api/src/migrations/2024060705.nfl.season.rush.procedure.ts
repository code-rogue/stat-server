import {
    NFLSchema,
    CalcSeasonRushStats,
} from '../constants/nfl/service.constants';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    sequelize.query(`create or replace procedure ${NFLSchema}.${CalcSeasonRushStats}()
LANGUAGE SQL
as $$
    with rush_stats as (
        select
            pws.player_id,
            pws.season,
            sum(ws.carries) AS carries,
            sum(ws.rush_yards) AS rush_yards,
            sum(ws.rush_first_downs) AS rush_first_downs,
            avg(ws.rush_epa) AS rush_epa,
            sum(ws.rush_tds) AS rush_tds,
            sum(ws.rush_two_pt_conversions) AS rush_two_pt_conversions,
            sum(ws.rush_fumbles) AS rush_fumbles,
            sum(ws.rush_fumbles_lost) AS rush_fumbles_lost,
            sum(ws.special_teams_tds) AS special_teams_tds
        from nfl.player_weekly_stats pws
            inner join nfl.weekly_stats_rush ws ON pws.id = ws.player_weekly_id
          where pws.player_id is not null and pws.season is not null
          group by pws.season, pws.player_id
      ), season_stats as (
        select 
            s.id as player_season_id,
            ss.carries,
            ss.rush_yards,
            ss.rush_first_downs,
            ss.rush_epa,
            ss.rush_tds,
            ss.rush_two_pt_conversions,
            ss.rush_fumbles,
            ss.rush_fumbles_lost,
            ss.special_teams_tds
        from rush_stats as ss 
            inner join nfl.player_season_stats as s on s.player_id = ss.player_id and s.season = ss.season
    )
    merge into nfl.season_stats_rush as ssd 
    using season_stats as ss on ss.player_season_id = ssd.player_season_id
    when matched then 
        update set carries = ss.carries,
            rush_yards = ss.rush_yards,
            rush_first_downs = ss.rush_first_downs,
            rush_epa = ss.rush_epa,
            rush_tds = ss.rush_tds,
            rush_two_pt_conversions = ss.rush_two_pt_conversions,
            rush_fumbles = ss.rush_fumbles,
            rush_fumbles_lost = ss.rush_fumbles_lost,
            special_teams_tds = ss.special_teams_tds                
    when not matched then
        insert (player_season_id, carries, rush_yards, rush_first_downs, rush_epa, rush_tds, rush_two_pt_conversions, 
                rush_fumbles, rush_fumbles_lost, special_teams_tds)
        values (ss.player_season_id, ss.carries, ss.rush_yards, ss.rush_first_downs, ss.rush_epa, ss.rush_tds, ss.rush_two_pt_conversions, 
                ss.rush_fumbles, ss.rush_fumbles_lost, ss.special_teams_tds);
$$`);
}

export const down: Migration = async ({ context: sequelize }) => {
    sequelize.query(`drop procedure ${NFLSchema}.${CalcSeasonRushStats}`);
}