import { Model } from 'sequelize';

export class WeeklyStatModel extends Model {
    public id: number;
    public game_id: number;
    public pfr_game_id: number;
    public player_id: number;
    public season: string;
    public week: number;
    public game_type: string;
    public opponent: string;
    public fantasy_points: number;
    public fantasy_points_ppr: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class WeeklyDefStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public tackles: number;
    public tackles_solo: number;
    public tackle_with_assists: number;
    public tackle_assists: number;
    public tackles_for_loss: number;
    public tackles_for_loss_yards: number;
    public fumbles_forced: number;
    public sacks: number;
    public sack_yards: number;
    public qb_hits: number;
    public interceptions: number;
    public interception_yards: number;
    public pass_defended: number;
    public tds: number;
    public fumbles: number;
    public fumble_recovery_own: number;
    public fumble_recovery_yards_own: number;
    public fumble_recovery_opp: number;
    public fumble_recovery_yards_opp: number;
    public safety: number;
    public penalty: number;
    public penalty_yards: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class WeeklyKickStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public fg_att: number;
    public fg_made: number;
    public fg_missed: number;
    public fg_blocked: number;
    public fg_pct: number;
    public fg_long: number;
    public fg_made_0_19: number;
    public fg_made_20_29: number;
    public fg_made_30_39: number;
    public fg_made_40_49: number;
    public fg_made_50_59: number;
    public fg_made_60_: number;
    public fg_missed_0_19: number;
    public fg_missed_20_29: number;
    public fg_missed_30_39: number;
    public fg_missed_40_49: number;
    public fg_missed_50_59: number;
    public fg_missed_60_: number;
    public fg_made_distance: number;
    public fg_missed_distance: number;
    public fg_blocked_distance: number;
    public fg_made_list: string;
    public fg_missed_list: string;
    public fg_blocked_list: string;
    public gwfg_att: number;
    public gwfg_distance: number;
    public gwfg_made: number;
    public gwfg_missed: number;
    public gwfg_blocked: number;
    public pat_att: number;
    public pat_made: number;
    public pat_missed: number;
    public pat_blocked: number;
    public pat_pct: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class WeeklyPassStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public attempts: number;
    public completions: number;
    public pass_yards: number;
    public pass_yards_after_catch: number;
    public pass_air_yards: number;
    public pass_air_conversion_ratio: number;
    public pass_first_down: number;
    public dakota: number;
    public pass_epa: number;
    public pass_tds: number;
    public pass_two_pt_conversions: number;
    public interceptions: number;
    public sacks: number;
    public sack_yards: number;
    public sack_fumbles: number;
    public sack_fumbles_lost: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class WeeklyRecStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public targets: number;
    public receptions: number;
    public target_share: number;
    public rec_yards: number;
    public rec_yards_after_catch: number;
    public rec_air_yards: number;
    public rec_air_yards_share: number;
    public rec_air_conversion_ratio: number;
    public weighted_opportunity_rating: number;
    public rec_epa: number;
    public rec_tds: number;
    public rec_two_pt_conversions: number;
    public rec_first_downs: number;
    public rec_fumbles: number;
    public rec_fumbles_lost: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class WeeklyRushStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public carries: number;
    public rush_yards: number;
    public rush_first_downs: number;
    public rush_epa: number;
    public rush_tds: number;
    public rush_two_pt_conversions: number;
    public rush_fumbles: number;
    public rush_fumbles_lost: number;
    public special_teams_tds: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}