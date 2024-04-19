import { Model } from 'sequelize';

export default class WeeklyNextGenPassStatModel extends Model {
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