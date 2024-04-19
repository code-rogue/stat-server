import { Model } from 'sequelize';

export default class WeeklyNextGenRecStatModel extends Model {
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