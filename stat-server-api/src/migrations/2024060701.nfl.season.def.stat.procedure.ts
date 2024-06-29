import {
    NFLSchema,
    CalcSeasonDefStats,
} from '../constants/nfl/service.constants';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    sequelize.query(`create or replace procedure ${NFLSchema}.${CalcSeasonDefStats}()
    LANGUAGE SQL
    as $$
        with def_stats as (
            select
                pws.player_id,
                pws.season,
                sum(ws.tackles) AS tackles,
                sum(ws.tackles_solo) AS tackles_solo,
                sum(ws.tackle_with_assists) AS tackle_with_assists,
                sum(ws.tackle_assists) AS tackle_assists,
                sum(ws.tackles_for_loss) AS tackles_for_loss,
                sum(ws.tackles_for_loss_yards) AS tackles_for_loss_yards,
                sum(ws.fumbles_forced) AS fumbles_forced,
                sum(ws.sacks) AS sacks,
                sum(ws.sack_yards) AS sack_yards,
                sum(ws.qb_hits) AS qb_hits,
                sum(ws.interceptions) AS interceptions,
                sum(ws.interception_yards) AS interception_yards,
                sum(ws.pass_defended) AS pass_defended,
                sum(ws.tds) AS tds,
                sum(ws.fumbles) AS fumbles,
                sum(ws.fumble_recovery_own) AS fumble_recovery_own,
                sum(ws.fumble_recovery_yards_own) AS fumble_recovery_yards_own,
                sum(ws.fumble_recovery_opp) AS fumble_recovery_opp,
                sum(ws.fumble_recovery_yards_opp) AS fumble_recovery_yards_opp,
                sum(ws.safety) AS safety,
                sum(ws.penalty) AS penalty,
                sum(ws.penalty_yards) AS penalty_yards
            from nfl.player_weekly_stats pws
                inner join nfl.weekly_stats_def ws ON pws.id = ws.player_weekly_id
              where pws.player_id is not null and pws.season is not null
              group by pws.season, pws.player_id
          ), season_stats as (
            select 
                s.id as player_season_id,
                ss.tackles,
                ss.tackles_solo,
                ss.tackle_with_assists,
                ss.tackle_assists,
                ss.tackles_for_loss,
                ss.tackles_for_loss_yards,
                ss.fumbles_forced,
                ss.sacks,
                ss.sack_yards,
                ss.qb_hits,
                ss.interceptions,
                ss.interception_yards,
                ss.pass_defended,
                ss.tds,
                ss.fumbles,
                ss.fumble_recovery_own,
                ss.fumble_recovery_yards_own,
                ss.fumble_recovery_opp,
                ss.fumble_recovery_yards_opp,
                ss.safety,
                ss.penalty,
                ss.penalty_yards
            from def_stats as ss 
                inner join nfl.player_season_stats as s on s.player_id = ss.player_id and s.season = ss.season
        )
        merge into nfl.season_stats_def as ssd 
        using season_stats as ss on ss.player_season_id = ssd.player_season_id
        when matched then 
            update set tackles = ss.tackles,
                tackles_solo = ss.tackles_solo,
                tackle_with_assists = ss.tackle_with_assists,
                tackle_assists = ss.tackle_assists,
                tackles_for_loss = ss.tackles_for_loss,
                tackles_for_loss_yards = ss.tackles_for_loss_yards,
                fumbles_forced = ss.fumbles_forced,
                sacks = ss.sacks,
                qb_hits = ss.qb_hits,
                interceptions = ss.interceptions,
                interception_yards = ss.interception_yards,
                pass_defended = ss.pass_defended,
                tds = ss.tds,
                fumbles = ss.fumbles,
                fumble_recovery_own = ss.fumble_recovery_own,
                fumble_recovery_yards_own = ss.fumble_recovery_yards_own,
                fumble_recovery_opp = ss.fumble_recovery_opp,
                fumble_recovery_yards_opp = ss.fumble_recovery_yards_opp,
                safety = ss.safety,
                penalty = ss.penalty,
                penalty_yards = ss.penalty_yards 
        when not matched then
            insert (player_season_id, tackles, tackles_solo, tackle_with_assists, tackle_assists, tackles_for_loss, tackles_for_loss_yards, fumbles_forced, sacks, sack_yards, qb_hits, interceptions, interception_yards, pass_defended, tds, fumbles, fumble_recovery_own, fumble_recovery_yards_own, fumble_recovery_opp, fumble_recovery_yards_opp, safety, penalty, penalty_yards)
            values (ss.player_season_id, ss.tackles, ss.tackles_solo, ss.tackle_with_assists, ss.tackle_assists, ss.tackles_for_loss, ss.tackles_for_loss_yards, ss.fumbles_forced, ss.sacks, ss.sack_yards, ss.qb_hits, ss.interceptions, ss.interception_yards, ss.pass_defended, ss.tds, ss.fumbles, ss.fumble_recovery_own, ss.fumble_recovery_yards_own, ss.fumble_recovery_opp, ss.fumble_recovery_yards_opp, ss.safety, ss.penalty, ss.penalty_yards);    
    $$`);
}

export const down: Migration = async ({ context: sequelize }) => {
    sequelize.query(`drop procedure ${NFLSchema}.${CalcSeasonDefStats}`);
}