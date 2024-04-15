import { Model } from 'sequelize';

export class WeeklyNextGenPassStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public aggressiveness: number;
    public avg_time_to_throw: number;
    public avg_air_distance: number;
    public max_air_distance: number;
    public avg_completed_air_yards: number;
    public avg_intended_air_yards: number;
    public avg_air_yards_to_sticks: number;
    public max_completed_air_distance: number;
    public passer_rating: number;
    public completion_pct: number;
    public expected_completion_pct: number;
    public completions_above_expectation_pct: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class WeeklyNextGenRecStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public avg_cushion: number;
    public avg_intended_air_yards_pct: number;
    public avg_separation: number;
    public avg_intended_air_yards: number;
    public catch_pct: number;
    public share_of_intended_air_yards_pct: number;
    public avg_yac: number;
    public avg_expected_yac: number;
    public avg_yac_above_expectation: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class WeeklyNextGenRushStatModel extends Model {
    public id: number;
    public player_weekly_id: number;
    public efficiency: number;
    public attempts_gte_eight_defenders_pct: number;
    public avg_time_to_los: number;
    public expected_yards: number;
    public yards_over_expected: number;
    public avg_yards: number;
    public yards_over_expected_per_att: number;
    public yards_over_expected_pct: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}