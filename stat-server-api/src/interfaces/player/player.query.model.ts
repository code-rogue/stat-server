import {
    SeasonDefQueryModel,
    SeasonKickQueryModel,
    SeasonPassQueryModel,
    SeasonRecQueryModel,
    SeasonRushQueryModel,
    WeeklyDefQueryModel,
    WeeklyKickQueryModel,
    WeeklyPassQueryModel,
    WeeklyRecQueryModel,
    WeeklyRushQueryModel,
} from '@interfaces/stats/query.model';

import {
    SeasonAdvDefQueryModel,
    SeasonAdvPassQueryModel,
    SeasonAdvRecQueryModel,
    SeasonAdvRushQueryModel,
    WeeklyAdvDefQueryModel,
    WeeklyAdvPassQueryModel,
    WeeklyAdvRecQueryModel,
    WeeklyAdvRushQueryModel,
} from '@interfaces/stats/adv.query.model';

import {
    WeeklyNextGenPassQueryModel,
    WeeklyNextGenRecQueryModel,
    WeeklyNextGenRushQueryModel,
} from '@interfaces/stats/nextGen.query.model';
import { TeamQueryModel } from '@interfaces/player/team.query.model';

export interface WeeklyStatQueryModel {
    id: number,
    game_id?: number,
    pfr_game_id?: number,
    player_id?: number,
    season?: string,
    week?: number,
    game_type?: string,
    team_id?: number,
    opponent_id?: number,
    fantasy_points?: number,
    fantasy_points_ppr?: number,
    advanced?: {
        def?: WeeklyAdvDefQueryModel,
        pass?: WeeklyAdvPassQueryModel,
        rec?: WeeklyAdvRecQueryModel,
        rush?: WeeklyAdvRushQueryModel,
    },
    nextgen?: {
        pass?: WeeklyNextGenPassQueryModel,
        rec?: WeeklyNextGenRecQueryModel,
        rush?: WeeklyNextGenRushQueryModel,
    },
    stats?: {
        def?: WeeklyDefQueryModel,
        kick?: WeeklyKickQueryModel,
        pass?: WeeklyPassQueryModel,
        rec?: WeeklyRecQueryModel,
        rush?: WeeklyRushQueryModel,
    },

    weeklyDef?: WeeklyDefQueryModel,
    weeklyKick?: WeeklyKickQueryModel,
    weeklyPass?: WeeklyPassQueryModel,
    weeklyRec?: WeeklyRecQueryModel,
    weeklyRush?: WeeklyRushQueryModel,

    weeklyAdvDef?: WeeklyAdvDefQueryModel,
    weeklyAdvPass?: WeeklyAdvPassQueryModel,
    weeklyAdvRec?: WeeklyAdvRecQueryModel,
    weeklyAdvRush?: WeeklyAdvRushQueryModel,

    weeklyNextGenPass?: WeeklyNextGenPassQueryModel,
    weeklyNextGenRec?: WeeklyNextGenRecQueryModel,
    weeklyNextGenRush?: WeeklyNextGenRushQueryModel,
}

export interface SeasonStatQueryModel {
    id: number,
    player_id?: number,
    season?: string,
    age?: number,
    games_played?: number,
    games_started?: number,
    fantasy_points?: number,
    fantasy_points_ppr?: number,
    advanced?: {
        def?: WeeklyAdvDefQueryModel,
        pass?: WeeklyAdvPassQueryModel,
        rec?: WeeklyAdvRecQueryModel,
        rush?: WeeklyAdvRushQueryModel,
    },
    seasonAdvDef?: SeasonAdvDefQueryModel,
    seasonAdvPass?: SeasonAdvPassQueryModel,
    seasonAdvRec?: SeasonAdvRecQueryModel,
    seasonAdvRush?: SeasonAdvRushQueryModel,

    stats?: {
        def?: SeasonDefQueryModel,
        kick?: SeasonKickQueryModel,
        pass?: SeasonPassQueryModel,
        rec?: SeasonRecQueryModel,
        rush?: SeasonRushQueryModel,
    },

    seasonDef?: SeasonDefQueryModel,
    seasonKick?: SeasonKickQueryModel,
    seasonPass?: SeasonPassQueryModel,
    seasonRec?: SeasonRecQueryModel,
    seasonRush?: SeasonRushQueryModel,
    team?: TeamQueryModel,
    opponent?: TeamQueryModel,
    weeks?: WeeklyStatQueryModel[],
    created_date?: Date,
    last_modified?: Date,
}

export interface PlayerQueryModel {
    id: number,
    career_status?: string,
    game_status_abbr?: string,
    game_status?: string,
    esb_id?: string,
    gsis_id?: string,
    gsis_it_id?: string,
    smart_id?: string,
    pfr_id?: string,
    full_name?: string,
    first_name?: string,
    last_name?: string,
    short_name?: string,
    suffix?: string,
    bio?: {
        id?: number,
        player_id?: number,
        birth_date?: Date,
        college?: string,
        college_conference?: string,
        height?: number,
        weight?: number,
        headshot_url?: string,
        created_date?: Date,
        last_modified?: Date,
    }
    league?: {
        id?: number,
        player_id?: number,
        position_group?: string,
        position?: string,
        jersey_number?: number,
        years_of_experience?: number,
        team?: string,
        team_seq?: string,
        team_id?: string,
        rookie_year?: string,
        draft_team?: string,
        draft_number?: string,
        draft_round?: string,
        season?: string,
        teamData?: TeamQueryModel,
        draftTeamData?: TeamQueryModel,
        created_date?: Date,
        last_modified?: Date,
    },    
    stats?: SeasonStatQueryModel[],
    created_date?: Date,
    last_modified?: Date,
}