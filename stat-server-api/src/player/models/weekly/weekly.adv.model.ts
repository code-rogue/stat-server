import { Model } from 'sequelize';

export class WeeklyAdvDefStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
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
    public pressures: number;
    public tackles_combined: number;
    public tackles_missed: number;
    public tackles_missed_pct: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class WeeklyAdvPassStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public pass_drops: number;
    public pass_drop_pct: number;
    public rec_drop: number;
    public rec_drop_pct: number;
    public bad_throws: number;
    public bad_throw_pct: number;
    public blitzed: number;
    public hurried: number;
    public hit: number;
    public pressured: number;
    public pressured_pct: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class WeeklyAdvRecStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public broken_tackles: number;
    public drops: number;
    public drop_pct: number;
    public interceptions: number;
    public qb_rating: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class WeeklyAdvRushStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public yards_before_contact: number;
    public yards_before_contact_avg: number;
    public yards_after_contact: number;
    public yards_after_contact_avg: number;
    public broken_tackles: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}