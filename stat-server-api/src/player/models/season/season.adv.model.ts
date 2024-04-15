import { Model } from 'sequelize';

export class SeasonAdvDefStatModel extends Model {
    public id: number;
    public player_season_id: number;
    public interceptions: number;
    public targets: number;
    public completions_allowed: number;
    public completions_pct: number;
    public yards_allowed: number;
    public yards_allowed_per_cmp: number;
    public yards_allowed_per_tgt: number;
    public tds_allowed: number;
    public passer_rating_allowed: number;
    public adot: number;
    public air_yards_completed: number;
    public yards_after_catch: number;
    public blitzed: number;
    public hurried: number;
    public qbkd: number;
    public sacks: number;
    public pressures: number;
    public tackles_combined: number;
    public tackles_missed: number;
    public tackles_missed_pct?: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class SeasonAdvPassStatModel extends Model {
    public id: number;
    public player_season_id: number;
    public attempts: number;
    public throw_aways: number;
    public spikes: number;
    public drops: number;
    public drop_pct: number;
    public bad_throws: number;
    public bad_throw_pct: number;
    public pocket_time: number;
    public blitzed: number;
    public hurried: number;
    public hit: number;
    public pressured: number;
    public pressured_pct: number;
    public batted_balls: number;
    public on_tgt_throws: number;
    public on_tgt_throws_pct: number;
    public rpo_plays: number;
    public rpo_yards: number;
    public rpo_pass_attempts: number;
    public rpo_pass_yards: number;
    public rpo_rush_attempts: number;
    public rpo_rush_yards: number;
    public pa_pass_attempts: number;
    public pa_pass_yards: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class SeasonAdvRecStatModel extends Model {
    public id: number;
    public player_season_id: number;
    public targets: number;
    public receptions: number;
    public yards: number;
    public tds: number;
    public longest_rec: number;
    public air_yards: number;
    public air_yards_avg: number;
    public yards_after_contact: number;
    public yards_after_contact_avg: number;
    public adot: number;
    public broken_tackles: number;
    public broken_tackles_avg: number;
    public drops: number;
    public drop_pct: number;
    public interceptions: number;
    public qb_rating: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class SeasonAdvRushStatModel extends Model {
    public id: number;
    public player_season_id: number;
    public attempts: number;
    public yards: number;
    public tds: number;
    public longest_rush: number;
    public yards_before_contact: number;
    public yards_before_contact_avg: number;
    public yards_after_contact: number;
    public yards_after_contact_avg: number;
    public broken_tackles: number;
    public broken_tackles_avg: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}