import {
    NFLSchema,
    CalcSeasonRecStats,
} from '../constants/nfl/service.constants';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    sequelize.query(`create or replace procedure ${NFLSchema}.${CalcSeasonRecStats}()
    LANGUAGE SQL
    as $$
        with rec_stats as (
            select
                pws.player_id,
                pws.season,
				sum(ws.targets) AS targets,
				sum(ws.receptions) AS receptions,
				avg(ws.target_share) AS target_share,
				sum(ws.rec_yards) AS rec_yards,
				sum(ws.rec_yards_after_catch) AS rec_yards_after_catch,
				sum(ws.rec_air_yards) AS rec_air_yards,
				avg(ws.rec_air_yards_share) AS rec_air_yards_share,
				avg(ws.rec_air_conversion_ratio) AS rec_air_conversion_ratio,
				avg(ws.weighted_opportunity_rating) AS weighted_opportunity_rating,
				avg(ws.rec_epa) AS rec_epa,
				sum(ws.rec_tds) AS rec_tds,
				sum(ws.rec_two_pt_conversions) AS rec_two_pt_conversions,
				sum(ws.rec_first_downs) AS rec_first_downs,
				sum(ws.rec_fumbles) AS rec_fumbles,
				sum(ws.rec_fumbles_lost) AS rec_fumbles_lost
            from nfl.player_weekly_stats pws
                inner join nfl.weekly_stats_rec ws ON pws.id = ws.player_weekly_id
              where pws.player_id is not null and pws.season is not null
              group by pws.season, pws.player_id
          ), season_stats as (
            select 
                s.id as player_season_id,
                ss.targets,
                ss.receptions,
                ss.target_share,
                ss.rec_yards,
                ss.rec_yards_after_catch,
                ss.rec_air_yards,
                ss.rec_air_yards_share,
                ss.rec_air_conversion_ratio,
                ss.weighted_opportunity_rating,
                ss.rec_epa,
                ss.rec_tds,
                ss.rec_two_pt_conversions,
                ss.rec_first_downs,
                ss.rec_fumbles,
                ss.rec_fumbles_lost
            from rec_stats as ss 
                inner join nfl.player_season_stats as s on s.player_id = ss.player_id and s.season = ss.season
        )
        merge into nfl.season_stats_rec as ssd 
        using season_stats as ss on ss.player_season_id = ssd.player_season_id
        when matched then 
            update set targets = ss.targets,
                receptions = ss.receptions,
                target_share = ss.target_share,
                rec_yards = ss.rec_yards,
                rec_yards_after_catch = ss.rec_yards_after_catch,
                rec_air_yards = ss.rec_air_yards,
                rec_air_yards_share = ss.rec_air_yards_share,
                rec_air_conversion_ratio = ss.rec_air_conversion_ratio,
                weighted_opportunity_rating = ss.weighted_opportunity_rating,
                rec_epa = ss.rec_epa,
                rec_tds = ss.rec_tds,
                rec_two_pt_conversions = ss.rec_two_pt_conversions,
                rec_first_downs = ss.rec_first_downs,
                rec_fumbles = ss.rec_fumbles,
                rec_fumbles_lost = ss.rec_fumbles_lost
        when not matched then
            insert (player_season_id, targets, receptions, target_share, rec_yards, rec_yards_after_catch, rec_air_yards, 
					rec_air_yards_share, rec_air_conversion_ratio, weighted_opportunity_rating, rec_epa, rec_tds, rec_two_pt_conversions, rec_first_downs, rec_fumbles, rec_fumbles_lost)
            values (ss.player_season_id, ss.targets, ss.receptions, ss.target_share, ss.rec_yards, ss.rec_yards_after_catch, ss.rec_air_yards, 
					ss.rec_air_yards_share, ss.rec_air_conversion_ratio, ss.weighted_opportunity_rating, ss.rec_epa, ss.rec_tds, ss.rec_two_pt_conversions, ss.rec_first_downs, ss.rec_fumbles, ss.rec_fumbles_lost);
    $$`);
}

export const down: Migration = async ({ context: sequelize }) => {
    sequelize.query(`drop procedure ${NFLSchema}.${CalcSeasonRecStats}`);
}